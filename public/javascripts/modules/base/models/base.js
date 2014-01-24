define(["modules/base/setup"], function () {
Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {

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
//            password: {required: true},
//            confirmPassword: {equalTo: 'password'}
//        }
    });
});
});