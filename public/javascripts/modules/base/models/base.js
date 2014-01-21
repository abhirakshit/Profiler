Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {

//    Base.models.Base = Backbone.Model.extend({
////        save: function (attrs, options) {
////            attrs = attrs || this.toJSON();
////            options = options || {};
////
////            // If model defines serverAttrs, replace attrs with trimmed version
////            if (this.serverAttrs)
////                attrs = _.pick(attrs, this.serverAttrs);
////
////            // Move attrs to options
////            options.attrs = attrs;
////
////            // Call super with attrs moved to options
////            Backbone.Model.prototype.save.call(this, attrs, options);
////        }
//    });

    Base.models.Generic = Backbone.Model.extend({
        initialize: function(attributes, options) {
            if (options && options.urlRoot)
                this.urlRoot = options.urlRoot;
            if (attributes && attributes.urlRoot)
                this.urlRoot = attributes.urlRoot;
            if (options && options.url)
                this.url = options.url;
            if (attributes && attributes.url)
                this.url = attributes.url;
        }
    });

    Base.collections.Generic = Backbone.Collection.extend({
        model: Base.models.Generic,

        initialize: function(attributes, options) {
            if (options && options.url)
                this.url = options.url;
            if (attributes && attributes.url)
                this.url = attributes.url;
        }
    })


    Base.models.User = Backbone.Model.extend({
        urlRoot: '/user'

//        validation: {
//            firstName: {required: true},
//            email: {required: true, pattern: 'email'},
//            ownerId: function(value){
//
//            },
//            institutionId: function(value) {
//
//            }
//        }
    });
});