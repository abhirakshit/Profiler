define(["modules/templateLoader/templateLoader"], function () {
    Application.module("Base", function (Base) {
        this.prefix = "base";
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