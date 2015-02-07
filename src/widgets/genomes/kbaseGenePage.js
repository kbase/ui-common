(function( $, undefined ) { 
    $.KBWidget({ 
        name: "KBaseGenePage", 
        parent: "kbaseWidget", 
        version: "1.0.0",

        options: {
            featureID: null,
            genomeID: null,
            workspaceID: null,
            loadingImage: "assets/img/ajax-loader.gif"
        },

        init: function(options) {
            this._super(options);
            if (this.options.workspaceID === 'CDS')
            	this.options.workspaceID = 'KBasePublicGenomesV4';
            this.render();
            return this;
        },

        render: function() {
            var self = this;
            var scope = {ws: this.options.workspaceID, gid: this.options.genomeID,
                    fid: this.options.featureID};
            ///////////////////////////////////////////////////////////////////////////////
            var cell1 = $('<div panel panel-default">');
            self.$elem.append(cell1);
            var panel1 = self.makePleaseWaitPanel();
            self.makeDecoration(cell1, 'Gene Overview', panel1);
            ///////////////////////////////////////////////////////////////////////////////
            var cell2 = $('<div panel panel-default">');
            self.$elem.append(cell2);
            var panel2 = self.makePleaseWaitPanel();
            self.makeDecoration(cell2, 'Biochemistry', panel2);
            ///////////////////////////////////////////////////////////////////////////////
            var cell3 = $('<div panel panel-default">');
            self.$elem.append(cell3);
            var panel3 = self.makePleaseWaitPanel();
            self.makeDecoration(cell3, 'Sequence', panel3);
            ///////////////////////////////////////////////////////////////////////////////
            var cell4 = $('<div panel panel-default">');
            self.$elem.append(cell4);
            var panel4 = self.makePleaseWaitPanel();
            //self.makeDecoration(cell4, 'Taxonomy', panel4);
            ///////////////////////////////////////////////////////////////////////////////
            var cell5 = $('<div panel panel-default">');
            self.$elem.append(cell5);
            var panel5 = self.makePleaseWaitPanel();
            //self.makeDecoration(cell5, 'Assembly and Annotation', panel5);

            var objId = scope.ws + "/" + scope.gid;
            var includedNoFeat = ["/complete","/contig_ids","/contig_lengths","contigset_ref","/dna_size",
                                  "/domain","/gc_content","/genetic_code","/id","/md5","num_contigs",
                                  "/scientific_name","/source","/source_id","/tax_id","/taxonomy"];

            var ready = function(genomeInfo) {
            	panel1.empty();
            	try {
            	    panel1.KBaseGeneInstanceInfo(
                            {featureID: scope.fid, genomeID: scope.gid, workspaceID: scope.ws, 
                                kbCache: kb, hideButtons:true, loadingImage: "assets/img/ajax-loader.gif"});
            	} catch (e) {
            	    console.error(e);
            	    self.showError(panel1, e.message);
                }
            	var searchTerm = "";
            	if (genomeInfo && genomeInfo.data['scientific_name'])
            		searchTerm = genomeInfo.data['scientific_name'];
            	panel2.empty();
                try {
                    panel2.KBaseGeneBiochemistry(
                            {featureID: scope.fid, genomeID: scope.gid, workspaceID: scope.ws, kbCache: kb,
                                loadingImage: "assets/img/ajax-loader.gif"});
                } catch (e) {
                    console.error(e);
                    self.showError(panel2, e.message);
                }
            	panel3.empty();
        	    panel3.KBaseGeneSequence(
        	            {featureID: scope.fid, genomeID: scope.gid, workspaceID: scope.ws, kbCache: kb,
                            loadingImage: "assets/img/ajax-loader.gif"});
            };
            
            kb.ws.get_object_subset( [ {ref:objId, included:includedNoFeat} ], function(data) {
            	var genomeInfo = data[0];
            	ready(genomeInfo);
            },
            function(error) {
            	console.error("Error loading genome subdata");
            	console.error(error);
            	panel1.empty();
                self.showError(panel1, error);
                cell2.empty();
                cell3.empty();
                cell4.empty();
                cell5.empty();
            });
        },

        makePleaseWaitPanel: function() {
        	return $('<div>').append('<p class="muted ajax-loader"><img src="' +
        			this.options.loadingImage + '"> loading...</p>');
        },
        
        makeDecoration: function($panel, title, $widgetDiv) {
            var id = this.genUUID();
            $panel.append(
                    $('<div class="panel-group" id="accordion_'+id+'" role="tablist" aria-multiselectable="true">')
                    .append($('<div class="panel panel-default">')
                            .append(''+
                                    '<div class="panel-heading" role="tab" id="heading_'+id+'">'+
                                    '<h4 class="panel-title">'+
                                    '<span data-toggle="collapse" data-parent="#accordion_'+id+'" data-target="#collapse_'+id+'" aria-expanded="false" aria-controls="collapse_'+id+'" style="cursor:pointer;">'+
                                    '<span class="fa fa-angle-right pull-left"></span>' + title + 
                                    '</span>'+
                                    '</h4>'+
                                    '</div>'
                            )
                            .append($('<div id="collapse_'+id+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_'+id+'" area-expanded="true">')
                                    .append($('<div class="panel-body">').append($widgetDiv))
                            )
                    )
            );
        },
        
        getData: function() {
            return {
                type: "Gene Page",
                id: this.options.genomeID + "/" + this.options.featureID,
                workspace: this.options.workspaceID,
                title: "Gene Page"
            };
        },

        showError: function(panel, e) {
            panel.empty();
            panel.append("Error: " + JSON.stringify(e)); 
        },
        
        genUUID: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    });
})( jQuery );