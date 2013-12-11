Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {
    Base.models.Generic = Backbone.Model.extend({
        initialize: function(attributes, options) {
            if (options && options.urlRoot)
                this.urlRoot = options.urlRoot;
        }
    });

    Base.collections.Generic = Backbone.Collection.extend({
        model: Base.models.GenericModel
    })
});