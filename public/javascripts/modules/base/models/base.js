Tracker.module("Base",function (Base, Tracker, Backbone, Marionette, $, _) {
    Base.Model = Backbone.Model.extend({
        initialize: function(attributes, options) {
            if (options && options.urlRoot)
                this.urlRoot = options.urlRoot;
        }
    });
});