
// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
//Application.module("Base", function(){
//    this.prefix = "base";
//    this.templatePath = "assets/javascripts/modules/";
//    this.views = {};
//
//    this.template = function(str) {
//        return this.prefix + '-' + str;
//    };
//
//    // This has been added to only keep class naming consistent with views.
//    this.models = {};
//    this.collections = {};
//});

var dependencies = [
    //Models
    "modules/base/models/base",
    "modules/base/models/multiSelect",

    //Views
    "modules/base/views/layouts/layouts",
    "modules/base/views/tables/tables",
    "modules/base/views/forms/formElems",
    "modules/base/views/headers/pageHeader",
    "modules/base/views/navigation/navTabs",
    "modules/base/views/validation/validationMessages",

    //Controller
    "modules/base/controller"
];

//define(dependencies, function(){
define([
    //Models
    "modules/base/models/base",
    "modules/base/models/multiSelect",

    //Views
    "modules/base/views/layouts/layouts",
    "modules/base/views/tables/tables",
    "modules/base/views/forms/formElems",
    "modules/base/views/headers/pageHeader",
    "modules/base/views/navigation/navTabs",
    "modules/base/views/validation/validationMessages",

    //Controller
    "modules/base/controller"
    ], function(){
//    console.log(module.config().user)
    Application.module("Base", function(Base, Application, Backbone, Marionette, $, _){

        this.prefix = "base";
        this.templatePath = "assets/javascripts/modules/";
        this.views = {};

        this.template = function(str) {
            return this.prefix + '-' + str;
        };

        // These have been added to only keep model classes naming consistent with views.
        this.models = {};
        this.collections = {};


        Application.addInitializer(function(){
            console.log("Init Base...")
//            console.log(module.config().user)
            Marionette.TemplateLoader.loadModuleTemplates(Application.Base, Application.Base.show);
        });
    });
});