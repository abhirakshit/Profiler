define([], function () {
    Application.module("Career", function (Career, Application, Backbone, Marionette, $, _) {
        this.prefix = "Career";
        this.templatePath = "assets/javascripts/modules/";
        this.views = {};

        this.template = function (str) {
            return this.prefix + '-' + str;
        };
        // This has been added to only keep class naming consistent with views.
        this.models = {};
        this.collections = {};
    });
});