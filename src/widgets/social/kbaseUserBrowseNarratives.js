define(['jquery', 'nunjucks', 'kbasesocialwidget',  'kbaseworkspaceserviceclient', 'q'], 
function ($, nunjucks, SocialWidget, WorkspaceService, Q) {
	var RecentActivityWidget = Object.create(SocialWidget, {
		init: {
			value: function (cfg) {
				cfg.name = 'BrowseNarratives';
				cfg.title = 'Browse Narratives';
				this.SocialWidget_init(cfg);

        // Prepare templating.
				this.templates.env.addFilter('dateFormat', function(dateString) {					
					return this.niceElapsedTime(dateString);
        }.bind(this));
				
				// TODO: get this from somewhere, allow user to configure this.
				this.params.limit = 10;
        
        this.syncApp();

        return this;
			}
		},
    
    // To be called whenever the params or auth have changed.
    // Rebuild the widget.
    syncApp: {
      value: function () {
    		if (this.isLoggedIn()) {
          if (this.hasConfig('workspace_url')) {
    				this.workspaceClient = new WorkspaceService(this.getConfig('workspace_url'), {
    					token: this.auth.authToken
    				});
          } else {
    			  throw 'The workspace client url is not defined';
    		  }
        } else {
          this.workspaceClient = null;
        }
      }
    },
    
    go: {
      value: function () {
        this.start();
        return this;
      }
    },
    
		getCurrentState: {
			value: function(options) {
				// Reset or create the recent activity list.
        var def = Q.defer();
        
				var recentActivity = [];
        
        // We only run any queries if the session is authenticated.
        if (!this.isLoggedIn()) {
          //options.success();
          def.resolve();
          return def.promise;
        }

				// Note that Narratives are now associated 1-1 with a workspace. 
				// Some new narrative attributes, such as name and (maybe) description, are actually
				// stored as attributes of the workspace itself.
				// At present we can just use the presence of "narrative_nice_name" metadata attribute 
				// to flag a compatible workspace.
        //
        this.promise(this.workspaceClient, 'list_workspace_info', {
					showDeleted: 0,
					owners: [this.params.userId]
				})
        .then(function(data) {
          var narratives = [];
					// First we both transform each ws info object into a nicer js object,
					// and filter for modern narrative workspaces.
					for (var i=0; i<data.length; i++) {
						//tuple<ws_id id, ws_name workspace, username owner, timestamp moddate,
						//int object, permission user_permission, permission globalread,
						//lock_status lockstat, usermeta metadata> workspace_info
						var wsInfo = this.workspace_metadata_to_object(data[i]);
            
            // make sure a modern narrative.
            if (wsInfo.metadata.narrative && wsInfo.metadata.is_temporary !== 'true') {
              narratives.push({
                  obj_id: this.makeWorkspaceObjectId(wsInfo.id, wsInfo.metadata.narrative),
                  title: wsInfo.metadata.narrative_nice_name,
                  description: wsInfo.metadata.narrative_description,
                  moddate: wsInfo.moddate
              });
						}
					}
					// We should now have the list of recently active narratives.
					// Now we sort and limit the list.
					narratives.sort(function(a, b) {
						var x = new Date(a.moddate);
						var y = new Date(b.moddate);
						return ((x < y) ? 1 : ((x > y) ? -1 : 0));
					});
          this.setState('narratives', narratives);
          def.resolve();
				}.bind(this))
        .catch(function(err) {
          def.reject(err);
        });
        
        return def.promise;
			}	
		}
	});

	return RecentActivityWidget;
});
