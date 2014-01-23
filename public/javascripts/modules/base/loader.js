// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
Application.module("Base", function () {
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


var dependencies = [

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
    "modules/base/views/tables/tables",
    "modules/base/views/forms/formElems",
    "modules/base/views/headers/pageHeader",
    "modules/base/views/navigation/navTabs",
    "modules/base/views/validation/validationMessages",

    //Controller
    "modules/base/controller"
];

define(dependencies,
    function () {
//    console.log(module.config().user)
        Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {
            return Base.addInitializer(function () {
                console.log("Init Base...")
//            console.log(module.config().user)
                Marionette.TemplateLoader.loadModuleTemplates(Base, Base.show);
            });
        });
    });