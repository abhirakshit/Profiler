Tracker.module("Base",function (Base, Tracker, Backbone, Marionette, $, _) {
    Base.MultiSelectModel = Backbone.Model.extend({
    });

    Base.MultiSelectCollection = Backbone.Collection.extend({
        model: Base.MultiSelectModel,

        initialize: function(attributes, options) {
            if (options && options.url)
                this.url = options.url;
        },

        parse: function(response) {
            return response;
        }
    });
});