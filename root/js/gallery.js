var WidgetGallery = Ember.Application.create();

WidgetGallery.Router.map(function () {});

WidgetGallery.IndexRoute = Ember.Route.extend({
    model: function () {
        var registry = return KBWidget.registry();
        return Object.keys(registry);
    }
});