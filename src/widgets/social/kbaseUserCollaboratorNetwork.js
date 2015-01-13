define(['jquery', 'nunjucks', 'kbasesocialwidget', 'kbaseworkspaceserviceclient', 'kbaseuserprofileserviceclient', 'q'], 
       function ($, nunjucks, SocialWidget, WorkspaceService, UserProfileService,  Q) {
  "use strict";
	var Widget = Object.create(SocialWidget, {
		init: {
			value: function (cfg) {
				cfg.name = 'CommonCollaboratorNetwork';
				cfg.title = 'Common Collaborator Network';
				this.SocialWidget_init(cfg);
        
        // PARAMS
        this.params = {}

        if (!cfg.userId) {
          throw 'The userId is required for this widget but was not provided';
        }
        this.params.userId = cfg.userId;
        
        $.ajaxSetup({
            timeout: 10000
        });
        
        this.syncApp();
        
        return this;
			}
		},
    
    go: {
      value: function () {
        this.start();
        return this;
      }
    },
    
    syncApp: {
      value: function () {
        // Set up workspace client
				if (this.isLoggedIn()) {
          if (this.hasConfig('workspace_url')) {
						this.workspaceClient = new WorkspaceService(this.getConfig('workspace_url'), {
							token: this.auth.authToken
						});
          } else {
					  throw 'The workspace client url is not defined';
				  }
          if (this.hasConfig('user_profile_url')) {
            this.userProfileClient = new UserProfileService(this.getConfig('user_profile_url'), {
                token: this.auth.authToken
            });
          } else {
					  throw 'The user profile client url is not defined';
				  }
        }  else {
          this.workspaceClient = null;
          this.userProfileClient = null;
        }      
      }
    },
    
		getCurrentState: {
			value: function(options) {
        var def = Q.defer();
        
        // get the current user profile...
        if (!this.isLoggedIn()) {
          //options.error('Not authorized');
          def.resolve();
        } else {
          //def.resolve();
          //return def.promise;
          this.to_promise(this.userProfileClient, 'get_user_profile', [this.params.userId])
          .then(function(data) {
            if (data && data[0]) {
              this.setState('currentUserProfile', data[0]);                
              this.buildCollaboratorNetwork()
              .then(function(network) {
                  this.setState('network', network);
                  def.resolve();                  
                }.bind(this))
              .catch(function (err) {
                console.log('error building collab network...'); console.log(err);
                def.reject(err);
              });
            } else {
              def.reject('User not found');
            }
          }.bind(this))
          .catch(function (err) {
            def.reject(err);
          });
        }
        return def.promise;
      }
		},
    
    // Specialized methods
    
    buildCollaboratorNetwork: {
      value: function(options) {
        var def = Q.defer();
        
        // step 1: list workspaces
        var network = {
          workspaces: {},
          users: {},
          all_links: []
        };
        this.to_promise(this.workspaceClient, 'list_workspace_info', {excludeGlobal: 1})
        .then(function(data) {
            // A function which modifies the widget state to help build the network and associated
            // data objects for a single workspace. The function is returned so that it can be run
            // with others in async parallel.
            // TODO: switch from jquery to Q based promises.
            var createUserPermCall = function(wsid) {
              var def = Q.defer();
              return this.to_promise(this.workspaceClient, 'get_permissions', {id: wsid})
              .then(function(permdata) {
                  // save perm data with the workspace
                  // NB: perm data is a map of username => permission
                	/* Represents the permissions a user or users have to a workspace:
	
                		'a' - administrator. All operations allowed.
                		'w' - read/write.
                		'r' - read.
                		'n' - no permissions.
                	*/
                  // TODO: just return the permdata, which will be collected,
                  // and alter loop through them all.
                  network.workspaces[wsid].perms = permdata;
                  var wsOwner = network.workspaces[wsid].owner;

                  // save unique user list
                  for (var username in permdata) {
                    if (permdata.hasOwnProperty(username)) {
                      if (username !== "*" && permdata[username] !== "n") {
                        // Name to be filled in later.
                        
                        network.users[username] = {
                          name: null
                        };
                        // Store the network link with the 'owns' relationship
                        // for the current user only.
                        if (wsOwner !== username) {
                          network.all_links.push({
                            userA: wsOwner,
                            userB: username,
                            rel: 'owns',
                            ws: wsid
                          });
                        }
                        // Otherwise for all other users in this permdata list
                        // create a network link (skipping the current user so that
                        // we don't link it to itself!) with the 'share' relationship.
                        for (var un2 in permdata) {
                          if (permdata.hasOwnProperty(un2)) {
                            if (un2 !== "*" && username !== un2) {
                              network.all_links.push({
                                userA: username,
                                userB: un2,
                                rel: "share",
                                ws: wsid
                              });
                            }
                          }
                        }
                      }
                    }
                  }
                }.bind(this))
                .catch(function(err) {
                  def.reject(err);
                  console.error("Error in finding permissions!");
                  console.error(err);
                });
                return def.promise;
            }.bind(this);

            
            // And here we assemble the array of calls.
            // container to store calls to get the people that have share access to each workspace
            var userPermCalls = [];
            for (var k=0; k<data.length; k++) {
              //tuple<ws_id id, ws_name workspace, username owner, timestamp moddate,
              //int object, permission user_permission, permission globalread,
              //lock_status lockstat, usermeta meptadata> workspace_info
              var wsid = data[k][0];
              var wsData = this.workspace_metadata_to_object(data[k]);
              
              // FIXME: Only consider workspaces which are "modern".
              // At present this means it has a narrative_nice_name
              try {
                if (wsData.metadata.narrative && wsData.metadata.is_temporary !== 'true') {
                  network.workspaces[wsid] = wsData;
                  network.users[wsData.owner] = {
                    name: null
                  };
                  userPermCalls.push(createUserPermCall(wsid));
                }
              } catch (e) {
                console.log('EX: ' + e);
              }
            }
            
            // this.render();
            
            Q.all(userPermCalls)
            .then(function() {
              try {
                var collaborators = this.assembleCollaborators(network);
              } catch (e) {
                console.log('EX: '); console.log(e);
              }
              network.collaborators = collaborators;
              
              // Get user profiles for all the users, update the colloborators adding the real name.
              var collaboratorUsers = this.set_to_array(collaborators);
              this.promise(this.userProfileClient, 'get_user_profile', collaboratorUsers)
              .then(function (data) {
                  try {
                    for (var i=0; i<data.length; i++) {
                      var username = data[i].user.username;
                      var realname = data[i].user.realname;
                      network.collaborators[username].realname = realname;
                    } 
                  
                    // Now reformat as a list with properties for easier display.
                    network.collaboratorTable = this.obj_to_array(network.collaborators, 'username', function (x) {
                      x.ws = this.set_to_array(x.ws);
                      return x;
                    }.bind(this));
                    def.resolve(network);
                  } catch (ex) {
                    console.log('EX:'); console.log(ex);
                    def.reject(ex);
                  }  
              }.bind(this))
              .catch(function (err) {
                def.reject(err);
              });
            }.bind(this))
            .catch(function(err) {
              def.reject(err);
            });

          }.bind(this))
        .catch(function(err) {
          def.reject(err);
        });
        
        return def.promise;
      }
    },
    
    set_prop_set: {
      value: function (obj, path, key) {
        if (typeof path === 'string') {
          path = path.split('.');
        }
        for (var i=0; i<path.length; i++) {
          var k = path[i];
          if (!obj[k]) {
            obj[k] = {};
          }
          obj = obj[k];
        }
        obj[key] = 1;
      }
    },

    set_to_array: {
      value: function (obj) {
        var a = [];
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {continue;}
          a.push(key);
        }
        return a;
      }
    },
    
    obj_to_array: {
      value: function (obj, keyPropName, fun) {
        var keyPropName = keyPropName ? keyPropName : 'key';
        var a = [];
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {continue;}        
          var item = fun ? fun(obj[key]) : obj[key];
          item[keyPropName] = key;
          a.push(item);
        }
        return a;
      }
    },
    
    assembleCollaborators: {
      value: function(network) {
        var collaborators = {};
        if (network.all_links) {
          // This is the user that we are looking at.
          var thisUser = this.state.currentUserProfile.user.username;
          var links = network.all_links;
        
          var $tbl = $('<table class="table table-condensed">');
          for (var k = 0; k < links.length; k++) {
            var link = links[k];
          
            // collect links in which the current user is a participant (userA or userB).
            // use a set since there will be duplication (e.g. both relationships A-B, B-A are in the network...)
            if (links[k].userA === thisUser) {
              this.set_prop_set(collaborators, [link.userB, 'ws'], link.ws);
            }
            if (links[k].userB === thisUser) {
              this.set_prop_set(collaborators, [link.userA, 'ws'], link.ws);
            }
          }
        }
        return collaborators;
       
      }
    }
    

	});

	return Widget;
});
