// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
define([

    //Libs
//    "dataTables",
//    "dateTimePicker",
//    "backboneValidation",
//    "backboneSyphon",

    //Models

//    "modules/base/order!setup",
//    "modules/base/models/multiSelect",
//    "modules/base/models/base",

    "modules/base/setup",
    "modules/base/models/multiSelect",
    "modules/base/models/base",
//
//    //Views
    "modules/base/views/layouts/layouts",
    "modules/base/views/tables/tables",
    "modules/base/views/forms/formElems",
    "modules/base/views/headers/pageHeader",
    "modules/base/views/navigation/navTabs",
    "modules/base/views/validation/validationMessages",
//
//    //Controller
    "modules/base/controller",
],
    function () {
//    console.log(module.config().user)
        Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {
            Base.addInitializer(function () {
                console.log("Init Base...")
//            console.log(module.config().user)
                Marionette.TemplateLoader.loadModuleTemplates(Base, Base.show);
            });
        });
    });