/*global
 define
 */
/*jslint
 browser: true,
 white: true
 */
define([
    'kb.html',
    'kb.runtime',
    'q',
    'underscore',
    'kb.widget.vis.linechart'],
    function (html, R, q, _) {
        'use strict';

        function linechartWidget() {

            function widget(config) {

                var mount, container;


                function render() {

                    var sin = [];
                    var sin2 = [];
                    for (var i = 20; i < 200; i++) {
                        sin.push(
                            {
                                x : i,
                                y : 100 + 50 * Math.sin(0.1 * i),
                                y2 : 50 + 50 * Math.sin(0.1 * i)
                            }
                        );
                        sin2.push(75 + 50 * Math.sin(0.1 * i));
                    }

                    var $line = $.jqElem('div').css({width : '800px', height : '500px'}).kbaseLinechart(

                        {
                            scaleAxes       : true,
                            //debug       : true,

                            xLabel      : 'Expression profile',
                            //yLabel      : 'Meaningful data',
                            hGrid : true,
                            xLabels : false,

                            dataset : [
                                {
                                    strokeColor : 'red',
                                    fillColor : 'red',
                                    values : [
                                        { x : 10, y : 10, y2 : -10},
                                        { x : 20, y : 15, y2 : -20},
                                        { x : 30, y : 16, y2 : -5},
                                        { x : 40, y : 18, y2 : -2},
                                        { x : 50, y : 15, y2 : 5},
                                        { x : 60, y : 20, y2 : 8},
                                        { x : 70, y : 22, y2 : 3},
                                        { x : 80, y : 25, y2 : 4},
                                        { x : 90, y : 18, y2 : -5},
                                        { x : 100, y : 15, y2 : -10},
                                        { x : 110, y : 10, y2 : -12},
                                        { x : 120, y : 5, y2 : -20},
                                        { x : 130, y : 8, y2 : -30},
                                        { x : 140, y : 10, y2 : -100},
                                        { x : 150, y : 4, y2 : -10},
                                    ],
                                    label : 'area',
                                    width : 0,
                                    fillOpacity : 0.3,
                                },

                                {
                                    strokeColor : 'red',
                                    label : 'parabolic',
                                    values : [0,1,4,9,16,25,{x : 60, y : 36},49,64,81,100,121,144,169],
                                    width : 1,
                                },
                                {
                                    strokeColor : 'blue',
                                    label : 'sin',
                                    values : sin,
                                    width : 1,
                                    fillColor : 'blue',
                                    strokeOpacity : 0.3,
                                    fillOpacity : 0.3,
                                },
                                /*{
                                    strokeColor : 'black',
                                    label : 'sin',
                                    values : sin2,
                                    width : 1,
                                },*/
                            ],

                        }

                    );

                    return {
                        title: 'Sample line chart',
                        content: $line.$elem,
                    }

                }

                function attach(node) {
                    return q.Promise(function (resolve) {
                        mount = node;
                        container = document.createElement('div');
                        mount.appendChild(container);
                        var rendered = render();

                        R.send('app', 'title', rendered.title);
                        $(container).append(rendered.content);

                        resolve();
                    });
                }
                function start(params) {
                    return q.Promise(function (resolve) {
                        resolve();
                    });
                }
                function stop(node) {
                    return q.Promise(function (resolve) {

                        resolve();
                    });
                }
                function detach(node) {
                    return q.Promise(function (resolve) {

                        resolve();
                    });
                }

                return {
                    attach: attach,
                    start: start,
                    stop: stop,
                    detach: detach
                };
            }


            return {
                create: function (config) {
                    return widget(config);
                }
            };
        }


        function setup(app) {
            app.addRoute({
                path: ['linechart'],
                widget: linechartWidget()
            });

        }
        function teardown() {
            // TODO: remove routes
            return false;
        }
        function start() {
            //
            return false;
        }
        function stop() {
            //
            return false;
        }
        return {
            setup: setup,
            teardown: teardown,
            start: start,
            stop: stop
        };
    });