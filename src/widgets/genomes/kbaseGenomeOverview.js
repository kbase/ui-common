(function( $, undefined ) { 
    return KBWidget({ 
        name: "KBaseGenomeOverview", 
         
        version: "1.0.0",

        options: {
            genomeID: null,
            workspaceID: null,
            loadingImage: "assets/img/ajax-loader.gif",
            kbCache: null,
            isInCard: false,
            genomeInfo: null
        },

        token: null,
        cdmiURL: "https://kbase.us/services/cdmi_api",
        $infoTable: null,
        noContigs: "No Contigs",

        init: function(options) {
            this._super(options);
            //if (this.options.genomeID === null) {
            //    //throw an error
            //    return;
            //}

            this.$messagePane = $("<div/>")
                                //.addClass("kbwidget-message-pane")
                                .hide();
            this.$elem.append(this.$messagePane);

            this.render(); // this is moved inside central store and 
            if (this.options.workspaceID === null) {
                this.renderCentralStore();
            }
            else {
                this.renderWorkspace();
            }
            
            return this;
        },

        render: function() {
            var self = this;

            this.$infoPanel = $("<div>");
            /*this.$infoPanel.append($("<button>")
                           .addClass("btn btn-primary")
                           .append("Show Description")
                           .attr("type", "button")
                           .on("click", 
                               function(event) {
                                   self.trigger("showGenomeDescription", 
                                       {
                                           genomeID: self.options.genomeID,
                                           workspaceID: self.options.workspaceID,
                                           kbCache: self.options.kbCache,
                                           event: event
                                       }
                                   );
                               })
                           );
			
			this.$infoPanel.append($("<button>")
                                 .addClass("btn btn-primary")
                                 .append("Related Publications")
								 .attr("type", "button")
								 .on("click",
									function(event) {
														
										if (typeof self.pubmedQuery === null) {
											self.renderError("Genome '" + self.options.genomeID + "' not found in the KBase Central Store.");
											return;											
										}
										else {
											var query = self.pubmedQuery
											self.trigger("showLitWidget", 
												{ 
												literature: query, 
												workspaceID: self.options.workspaceID,
												genomeID: self.options.genomeID,
												kbCache: self.options.kbCache,
												event: event,
												}
											);
										}
										
									})
								);
                        if (self.options.workspaceID === null) {
                            // possibly we show other CDS related buttongs
                        } else {
                            // show ws related buttons
                            self.$infoPanel.append($("<button>")
                                 .addClass("btn btn-primary")
                                 .append("View Object Graph").attr("type", "button").on("click",
							function(event) {
                                                            window.location = "/functional-site/#/objgraphview/"+encodeURI(self.options.workspaceID+"/"+self.options.genomeID);
							}));
                        }
	    */							 
            this.$infoTable = $("<table>")
                              .addClass("table table-striped table-bordered");
            this.$infoPanel.append($("<div>").css("overflow","auto").append(this.$infoTable));
        
            this.$contigSelect = $("<select>")
                                 .addClass("form-control")
                                 .css({"width":"60%", "margin-right":"5px"})
                                 .append($("<option>")
                                         .attr("id", this.noContigs)
                                         .append(this.noContigs));

            var self = this;
            /*this.$contigButton = $("<button>")
                                 .addClass("btn btn-primary")
                                 .append("Show Contig")
                                 .click(function(event) {
                                    self.$elem.find("select option:selected").each(function() {
                                        var contigId = $(this).attr("id");
                                        if (contigId !== self.noContigs) {
                                            self.trigger("showContig", 
                                                { 
                                                    contig: $(this).attr("id"), 
                                                    workspaceId: self.options.workspaceID,
                                                    genomeId: self.options.genomeID,
                                                    kbCache: self.options.kbCache,
                                                    event: event,
                                                }
                                            );
                                        }
                                    })
                                 });
			
            this.$infoPanel.append($("<div>")
                              .addClass("form-inline")
                              .append(this.$contigSelect)
                              .append(this.$contigButton));
            */
            this.$infoPanel.hide();
            this.$elem.append(this.$infoPanel);
			
			// self.pubmedQuery = ""

        },

        addInfoRow: function(a, b) {
            return "<tr><th>" + a + "</th><td>" + b + "</td></tr>";
        },

        renderCentralStore: function() {
            this.cdmiClient = new CDMI_API(this.cdmiURL);
            this.entityClient = new CDMI_EntityAPI(this.cdmiURL);

            this.$infoPanel.hide();
            this.showMessage("<center><img src='" + this.options.loadingImage + "'> loading ...</center>");
            /**
             * Fields to show:
             * ID
             * Workspace (if from a workspace)
             * Owner (KBase Central Store vs. username)
             * Scientific Name
             * Domain
             * Complete
             * Size in bp
             * GC content (do we need this?)
             * # contigs
             * # features
             * # genes - PEGs
             * # RNA feats
             * Taxonomy
             */

            var self = this;
            this.entityClient.get_entity_Genome([this.options.genomeID],
                ['id', 'scientific_name', 'domain', 'complete', 'dna_size', 'source_id', 
                 'contigs', 'gc_content', 'pegs', 'rnas'],

                $.proxy(function(genome) {
                    genome = genome[this.options.genomeID];
                    this.genome = genome; // store it for now.

                    if (!genome) {
                        this.renderError("Genome '" + this.options.genomeID + "' not found in the KBase Central Store.");
                        return;
                    }
					
					self.pubmedQuery = genome.scientific_name
					//console.log(self.pubmedQuery)
                    
                    this.$infoTable.empty()
                                   .append(this.addInfoRow("ID", genome.id))
                                   .append(this.addInfoRow("Name", genome.scientific_name))
                                   .append(this.addInfoRow("Domain", genome.domain))
//                                   .append(this.addInfoRow("Complete?", (genome.complete ? "Yes" : "No")))
                                   .append(this.addInfoRow("DNA Length", genome.dna_size))
                                   .append(this.addInfoRow("Source ID", genome.source_id))
                                   .append(this.addInfoRow("Number of Contigs", genome.contigs))
                                   .append(this.addInfoRow("GC Content", Number(genome.gc_content).toFixed(2) + " %"))
                                   .append(this.addInfoRow("Protein Encoding Genes", genome.pegs))
                                   .append(this.addInfoRow("RNAs", genome.rnas));

                    /*
                     * Here we go. Chain of callbacks.
                     * Get list of contigs, then get their lengths.
                     * Sort them by length and make a dropdown menu.
                     * Add a button that will open a new card with that contig's browser.
                     */
                    if (this.options.isInCard) {
                        this.cdmiClient.genomes_to_contigs([this.options.genomeID],
                            $.proxy(function(contigs) {
                                this.cdmiClient.contigs_to_lengths(contigs[this.options.genomeID],
                                    $.proxy(function(contigsToLengths) { 
                                        this.populateContigSelector(contigsToLengths); 
                                    }, this),
                                    this.renderError
                                );
                            }, this),

                            this.renderError
                        );
                    }

                    this.hideMessage();
                    this.$infoPanel.show();

                }, this),

                this.renderError
            );

        },

        populateContigSelector: function(contigsToLengths) {
            this.$contigSelect.empty();
            if (!contigsToLengths || contigsToLengths.length == 0)
                this.$contigSelect.append($("<option>")
                                          .attr("id", this.noContigs)
                                          .append(this.noContigs));
            for (var contig in contigsToLengths) {
                this.$contigSelect.append($("<option>")
                                          .attr("id", contig)
                                          .append(contig + " - " + contigsToLengths[contig] + " bp"));
            }
        },

        alreadyRenderedTable : false,
        renderWorkspace: function() {
	    var self = this
            this.showMessage("<center><img src='" + this.options.loadingImage + "'> loading ...</center>");
            this.$infoPanel.hide();
            // console.log("rendering workspace genome");
            // console.log(this.options.kbCache);

            /*var objForSubset = this.buildObjectIdentity(this.options.workspaceID, this.options.genomeID);
            // first we try to get just the subdata that should be there
            objForSubset['included'] = ["/id","/scientific_name","/genetic_code","/domain"];
	    self.options.kbCache.ws.get_object_subset( [ objForSubset ], function(data) {
                    if (data[0]) {
                        if (!self.alreadyRenderedTable) {
                            self.$infoTable.empty()
                                   .append(self.addInfoRow("Name", data[0]['data'].scientific_name))
                                   .append(self.addInfoRow("KBase Genome ID", data[0]['data'].id))
                                   .append(self.addInfoRow("Domain", data[0]['data'].domain))
                                   .append(self.addInfoRow("Genetic Code", data[0]['data'].genetic_code));
                                   
                            //self.hideMessage();
                            self.$infoPanel.show();
                        }
                    }
                },
                function(error) { 
                	// don't worry about it for now, let the other function handle it
                });*/
            
            if (self.options.genomeInfo) {
            	self.showData(self.options.genomeInfo.data);
            } else {
            	var obj = this.buildObjectIdentity(this.options.workspaceID, this.options.genomeID);
            	var prom = this.options.kbCache.req('ws', 'get_objects', [obj]);
            	$.when(prom).done($.proxy(function(genome) {
            		// console.log(genome);
            		self.showData(genome[0].data);
            	}, this));
            	$.when(prom).fail($.proxy(function(error) { this.renderError(error); }, this));
            }
        },

        showData: function(genome) {
        	var self = this;
			self.pubmedQuery = genome.scientific_name
			//console.log(self.pubmedQuery)	
            
            var isInt = function(n) {
                return typeof n === 'number' && n % 1 == 0;
            };

			var gcContent = "Unknown";
            var dnaLength = "Unknown";
            if (genome.dna_size && genome.dna_size != 0) {
                dnaLength = genome.dna_size;
                if (genome.gc_content) {
                    gcContent = Number(genome.gc_content);
                    if (isInt(gcContent)) {
                        if (dnaLength)
                            gcContent = (gcContent/dnaLength*100).toFixed(2) + " %";
                    }
                    else {
                        gcContent = gcContent.toFixed(2) + " %";
                    }
                }
            } else if (Number(genome.gc_content) < 1.0) {
                gcContent = Number(genome.gc_content * 100).toFixed(2) + " %";
            }

            var nFeatures = 0;
            if (genome.features) {
                nFeatures = genome.features.length;
            }
            this.$infoTable.empty()
                           .append(this.addInfoRow("Name", genome.scientific_name))
                           .append(this.addInfoRow("KBase Genome ID", genome.id))
                           .append(this.addInfoRow("Domain", genome.domain))
                           .append(this.addInfoRow("DNA Length", dnaLength))
                           .append(this.addInfoRow("Source ID", genome.source + ": " + genome.source_id))
                           .append(this.addInfoRow("Number of Contigs", genome.contig_ids ? genome.contig_ids.length : 0))
                           .append(this.addInfoRow("GC Content", gcContent))
                           .append(this.addInfoRow("Genetic Code", genome.genetic_code))
                           .append(this.addInfoRow("Number of features", nFeatures));
            self.alreadyRenderedTable = true;
            var contigsToLengths = {};
            if (genome.contig_ids && genome.contig_ids.length > 0) {
                for (var i=0; i<genome.contig_ids.length; i++) {
                    var len = "Unknown";
                    if (genome.contig_lengths && genome.contig_lengths[i])
                        len = genome.contig_lengths[i];
                    contigsToLengths[genome.contig_ids[i]] = len;
                }
            }
            /************
             * TEMP CODE!
             * INFER CONTIGS FROM FEATURE LIST!
             * OMG THIS SUCKS THAT I HAVE TO DO THIS UNTIL FBA MODEL SERVICES IS FIXED!
             * LOUD NOISES!
             ************/
            else if (genome.features && genome.features.length > 0) {
                var contigSet = {};
                for (var i=0; i<genome.features.length; i++) {
                    var f = genome.features[i];
                    if (f.location && f.location[0][0])
                        contigsToLengths[f.location[0][0]] = "Unknown";
                }

            }

            //this.populateContigSelector(contigsToLengths);

            this.hideMessage();
            this.$infoPanel.show();
        },

        getData: function() {
            return {
                type: "Genome",
                id: this.options.genomeID,
                workspace: this.options.workspaceID,
                title: "Genome Overview"
            };
        },

        showMessage: function(message) {
        // kbase panel now does this for us, should probably remove this
          var span = $("<span/>").append(message);

            this.$messagePane.empty()
                             .append(span)
                             .show();
        },

        hideMessage: function() {
        // kbase panel now does this for us, should probably remove this
            this.$messagePane.hide();
            
        },

        buildObjectIdentity: function(workspaceID, objectID) {
            var obj = {};
            if (/^\d+$/.exec(workspaceID))
                obj['wsid'] = workspaceID;
            else
                obj['workspace'] = workspaceID;

            // same for the id
            if (/^\d+$/.exec(objectID))
                obj['objid'] = objectID;
            else
                obj['name'] = objectID;
            return obj;
        },

        renderError: function(error) {
            errString = "Sorry, an unknown error occurred";
            if (typeof error === "string")
                errString = error;
            else if (error.error && error.error.message)
                errString = error.error.message;

            
            var $errorDiv = $("<div>")
                            .addClass("alert alert-danger")
                            .append("<b>Error:</b>")
                            .append("<br>" + errString);
            this.$elem.empty();
            this.$elem.append($errorDiv);
        },

    });
})( jQuery );
