define(function () {
Application.module("Base",function (Base, Application, Backbone, Marionette, $, _) {

    Base.collections.MultiSelect = Backbone.Collection.extend({
        model: Base.models.Generic,

        initialize: function(attributes, options) {
            if (options && options.url)
                this.url = options.url;
        },

        parse: function(response) {
            return response;
        }
    });
});
});