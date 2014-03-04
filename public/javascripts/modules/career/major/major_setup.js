define([], function () {
    Application.module("Career.Major", function (Major, Application, Backbone, Marionette, $, _) {
        this.prefix = "Career.Major";
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