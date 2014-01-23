define(function () {
    Application.module("Base", function (Base) {
        Base.prefix = "base";
        Base.templatePath = "assets/javascripts/modules/";
        Base.views = {};

        Base.template = function (str) {
            return this.prefix + '-' + str;
        };

        // This has been added to only keep class naming consistent with views.
        Base.models = {};
        Base.collections = {};
    });
});