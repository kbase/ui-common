define (
	[
		'kbwidget',
		'bootstrap',
		'jquery',
		'kbwidget',
		'kbaseAuthenticatedWidget'
	], function(
		KBWidget,
		bootstrap,
		$,
		KBWidget,
		kbaseAuthenticatedWidget
	) {

    return KBWidget({
        name: "KBaseGWASPopKinshipTable",
        parent : kbaseAuthenticatedWidget,
        version: "1.0.0",
        options: {
            width: 500,
            type:"KBaseGwasData.GwasPopulationKinship"
        },
        workspaceURL: "https://kbase.us/services/ws/",

        init: function(options) {
            this._super(options);

            this.workspaceClient = new Workspace(this.workspaceURL, {token: this.authToken()});
        
            return this.render();
        },
        render: function () {
            var self = this;

            this.workspaceClient.get_objects([{name : this.options.id, workspace: this.options.ws}], 
                function(data){
                    self.collection = data[0];
                                        
                    self.$elem.append($("<div />").
                    append($("<table/>").addClass("kbgo-table")
                        .append($("<tr/>").append("<td>Gwas Population Object</td><td>" + self.collection.data.GwasPopulation_obj_id+ "</td>"))
                        .append($("<tr/>").append("<td>Gwas Population Variation Object</td><td>" + self.collection.data.GwasPopulationVariation_obj_id+ "</td>"))
                        .append($("<tr/>").append("<td>object_name</td><td>" + self.collection.info[1] + "</td>"))
                        .append($("<tr/>").append("<td>kbase_genome_id</td><td>" + self.collection.data.genome.kbase_genome_id + "</td>"))
                        .append($("<tr/>").append("<td>kbase_genome_name</td><td>" + self.collection.data.genome.kbase_genome_name + "</td>"))
                        .append($("<tr/>").append("<td>source_genome_name</td><td>" + self.collection.data.genome.source_genome_name + "</td>"))
                    ));
                },
                function (e) {
                    self.$elem.append("<div class='alert alert-danger'>" + e.error.message + "</div>");
                }
            );

            return this;
        },
        getData: function() {
            return {
                type: this.options.type,
                id: this.options.id,
                workspace: this.options.ws,
                title: "GWAS Kinship Details",
                draggable: false,
                resizable: false,
                dialogClass: 'no-close'
            };
        }
    });
});