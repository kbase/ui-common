/* Shows the SEED functional category hierarchy as a 
 * collapsable/expandable bar chart
 * 
 * Found a collapsable hierarcy example from Mike Bostock to follow:
 * https://gist.github.com/mbostock/1093025
 * 
 * will adapt this to work with the KBase SEED annotations
 */

 (function( $, undefined ) {
    $.KBWidget({
        name: "KBaseSEEDFunctions",
        parent: "kbaseWidget",
        version: "1.0.0",

        wsUrl:"https://kbase.us/services/ws",

        options: {
            objNameOrId: null,
            wsNameOrId: null,
            objVer: null,
            loadingImage: "assets/img/loading.gif",
            kbCache:{},         
            width:900         
        },
        
        SEEDTree:{ "name":"SEED", "count": 0, "children":[], "size":0, "x0":0, "y0":0 },
        subsysToGeneMap:[],

        margin:{top: 30, right: 20, bottom: 30, left: 20},
        width: 920,
        barHeight : 20,
        barWidth:400,
        svg:null,

        i : 0,
        duration : 400,
        root:null,

        tree:null,

        objName:"",
        wsName:"",


        /**
         * Initialize the widget.
         */

        init: function(options) {
            this._super(options);          
            this.render();

            var SEEDTree = this.SEEDTree;
            var subsysToGeneMap = this.subsysToGeneMap;

            var obj = {"ref" : this.options.wsNameOrId + "/" + this.options.objNameOrId };
            
            var prom = this.options.kbCache.req('ws', 'get_objects', [obj]);
        
            $.when(prom).fail($.proxy(function(error) {
                //this.renderError(error); Need to define this function when I have time
                console.log(error);
            }, this));

            $.when(prom).done($.proxy(function(genome) {
                var genomeObj = genome[0].data;
                console.log("Num Features: " + genomeObj.features.length);

                /*
                    First I am going to iterate over the Genome Typed Object and 
                    create a mapping of the assigned functional roles (by SEED) to
                    an array of genes with those roles. 

                    subsysToGeneMap [ SEED Role ] = Array of Gene Ids
                */

                genomeObj.features.forEach( function(f){

                    // Each function can have multiple genes, creating mapping of function to list of gene ids
                    if (subsysToGeneMap[f["function"]] === undefined) {subsysToGeneMap[f["function"]] = [];}
                    subsysToGeneMap[f["function"]].push(f["id"]);

                    // Not sure if this is necessary, but I'm going to keep track of the number of genes with
                    // SEED assigned functions in this count variable.
                    SEEDTree.count++; 
                });

                console.log("S: " + SEEDTree.count);
                this.loadSEEDHierarchy();

            }, this));
            

            return this;
        },


        /*
          I need to load the SEED subsystem ontology. I am going to use
          the "subsys.txt" file I found at: 
                ftp.theseed.org/subsystems/subsys.txt
          
          Note that this file is updated weekly, but not versioned. It's 
          possible that errors will arise because the subsystems assigned
          in the genome object are out of date relative to the current
          subsys.txt file.

          file format is:
          Level 1 \t Level 2 \t Level 3 \t Level 4\t Optional GO id \t Optional GO desc \n

          ontologyDepth is set to 4 for SEED

          SEED is not a strict heirarchy, some nodes have multiple parents
          I'm going to keep track of a nodes parents to map things right.

          loadSEEDHierarchy() function will parse file and populate the SEEDTree data structure
        */
        loadSEEDHierarchy: function() {
            var self = this;
            var ontologyDepth = 4; //this should be moved up to the global variables
            var nodeMap = {};

            var SEEDTree = self.SEEDTree;
            var subsysToGeneMap = self.subsysToGeneMap;

            d3.text("assets/data/subsys.txt", function(text) {
                var data = d3.tsv.parseRows(text);
                console.log("Lines: " + data.length);

                for (i = 0; i < data.length; i++) {
                    var geneCount = 0;
                    var nodeHierarchy = "";
                    var parentHierarchy = "SEED";

                    if (subsysToGeneMap[data[i][3]] === undefined) {
                        // if barchart needs to only show the subsystems that have genes in this genome,
                        // uncomment the continue statement.
                        //continue;
                    } else {
                        geneCount = subsysToGeneMap[data[i][3]].length;
                    }

                    for (j = 0; j < ontologyDepth; j++) {

                        // some node names are an empty string "". I'm going to set these to 
                        // a modified version of their parent node name 
                        data[i][j] = (data[i][j] === "") ? "--- " + data[i][j-1] + " ---" : data[i][j]; 
                        nodeHierarchy = parentHierarchy + ":" + data[i][j];

                        // create new node for top level of hierarchy if it's not already defined.
                        if (j === 0) {
                            if (nodeMap[nodeHierarchy] === undefined) {
                                var node = { "name" : data[i][j], size : 0, "children" : [] };
                                SEEDTree.children.push(node);
                                nodeMap[nodeHierarchy] = node;
                            }
                        } else {
                            if (nodeMap[nodeHierarchy] === undefined) {
                                var node = { "name" : data[i][j], size : 0, "children" : [] };
                                nodeMap[parentHierarchy].children.push(node);
                                nodeMap[nodeHierarchy] = node;

                                if ( j === ontologyDepth - 1 && subsysToGeneMap[data[i][j]] !== undefined) {
                                    subsysToGeneMap[data[i][j]].forEach( function(f){
                                        var gene = { "name" : f, "size" : 0 };
                                        node.children.push( gene );
                                    });
                                }
                            } 
                        }
                        nodeMap[nodeHierarchy].size += geneCount;
                        parentHierarchy = nodeHierarchy;
                    }
                }
                
            console.log("something " + self.SEEDTree.children.length);
            $.when( 
                self.SEEDTree.children.forEach(function(d) {
                    self.collapse(d)}) 
                ).done(
                    self.update(self.SEEDTree)
                );
            //this.update(this.root = SEEDTree);
            }); //).done( $.when( SEEDTree.children.forEach(self.collapse) ).done( self.update(self.SEEDTree)) );
            //this.update(this.root = SEEDTree);
        },


        update: function(source) {

            //if (this.tree === null) { this.tree = d3.layout.tree().nodeSize([0, 4]);}
            var self = this;
            var tree = d3.layout.tree().nodeSize([0, 4]);
            var nodes = tree.nodes(self.SEEDTree);
            console.log("Z: " + this.SEEDTree.children.length);
            var scale = d3.scale.linear().domain([0,400]).range([0,290]);
            var height = Math.max(500, nodes.length * this.barHeight + this.margin.top + this.margin.bottom);
            var i = self.i;
            d3.select("svg").transition()
                .duration(this.duration)
                .attr("height", height);

            d3.select(self.frameElement).transition()
                .duration(this.duration)
                .style("height", height + "px");

            // Compute the "layout".
            nodes.forEach(function(n, i) {
                n.x = i * self.barHeight;
            });

            // Update the nodes…
            var node = this.svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .style("opacity", 1e-6);

            // Enter any new nodes at the parent's previous position.
            nodeEnter.append("rect")
                .attr("y", -this.barHeight / 2)
                .attr("x", 300)
                .attr("height", self.barHeight)
                .attr("width", self.barWidth)
                .style("fill", self.color)
                .on("click", $.proxy(function(d) {self.click(d)}, self));

            nodeEnter.append("text")
                .attr("dy", 3.5)
                .attr("dx", 300 + 5.5)
                .text(function(d) { return d.name; });

            nodeEnter.append("rect")
                .attr("y", -self.barHeight / 2)
                //.attr("x", function (d) { return 0 - d.depth * 4;} )
                .attr("x", function (d) { return 0 + 295 - scale(d.size) - d.depth * 4;} )
                .attr("height", self.barHeight)
                .attr("width", function (d) { return scale(d.size); })
                .style("fill", self.color);

            nodeEnter.append("text")
                .attr("dy", 3.5)
                .attr("dx", 5.5)
                .text(function(d) { return d.size; });

            // Transition nodes to their new position.
            nodeEnter.transition()
                .duration(this.duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                .style("opacity", 1);

            node.transition()
                .duration(this.duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                .style("opacity", 1)
                .select("rect")
                .style("fill", self.color);

            // Transition exiting nodes to the parent's new position.
            node.exit().transition()
                .duration(this.duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .style("opacity", 1e-6)
                .remove();


            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

        },

        // Toggle children on click.
        click: function(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            console.log(this);
            this.update(d);
        },

        color: function(d) {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        },

        collapse: function(d) {
            var self = this;
            if (d.children) {
                d._children = d.children;
                //for(var i = 0; i < d._children.length; i++) {
                //    self.collapse(d._children[i]);
                //}
                d._children.forEach( function(n) {self.collapse(n)});
                d.children = null;
            }
        },

        getData: function() {
            return {title:"SEED Functional Categories :",id:this.objName, workspace:this.wsName};
        },

        render: function() {
            var margin =  this.margin,
                width = this.width;
                //svg = this.svg;


            this.$elem.append('<div id="mainview">');

            this.svg = d3.select("#mainview").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        }

    });
})( jQuery );