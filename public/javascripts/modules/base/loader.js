
// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
Tracker.module("Base", function(){
    this.prefix = "base";
    this.templatePath = "assets/javascripts/modules/";
    this.views = {};
    this.template = function(str) {
        return this.prefix + '-' + str;
    };
});

var dependencies = [
//    //App
//    "modules/templateLoader/templateLoader",

    //Libs
    "dataTables",
    "dateTimePicker",
//    "backboneValidation",
//    "backboneSyphon",

    //Models
    "modules/base/models/base",
    "modules/base/models/multiSelect",

    //Views
    "modules/base/views/layouts/layouts",
    "modules/base/views/forms/formElems",
    "modules/base/views/headers/pageHeader",
    "modules/base/views/navigation/navTabs",
    "modules/base/views/validation/validationMessages",

    //Controller
    "modules/base/controller"
];

define(dependencies, function(){
    Tracker.module("Base", function(Base, Tracker, Backbone, Marionette, $, _){
        Tracker.addInitializer(function(){
            console.log("Init Base...")
            Marionette.TemplateLoader.loadModuleTemplates(Tracker.Base, Tracker.Base.show);
        });
    });
});