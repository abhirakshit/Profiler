// loader for Main module
// the 'loader' includes initial module definition and manages the loading
// of all module files including javascript and templates
// this file should be config / boilerplate; keep


// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
//Application.module("Main", function (Main) {
//    Main.prefix = "main";
//    Main.templatePath = "assets/javascripts/module/";
//    Main.views = {};
//    Main.template = function(str) {
//        return Main.prefix + '-' + str;
//    };
//
//});


// Recommended: define all dependencies for this module
// while you could spread dependency requirements
// over all your module files on purely "as needed" basis,
// this adds to complication of code in your module files
// defining them all, here, has the advantage of limiting use of RequireJS
// to this loader file only

var dependencies = [

    //Base - Forcing base to load here. Have been having issues when trying to load as dependency from other module
    "modules/base/loader",

//    "modules/footer/footer",
    "modules/queries/loader",
    "modules/profiles/loader",
    "modules/sidebar/loader",
    "modules/settings/loader",
    "modules/header/loader",
    "modules/search/loader",

//    "module/main/controller"

    //App
    "modules/templateLoader/templateLoader"

];


// define the loader last. generally, it should depend on all
// module files, otherwise they may not get loaded

//define(dependencies,
define([

    //Base - Forcing base to load here. Have been having issues when trying to load as dependency from other module
    "modules/base/loader",

//    "modules/footer/footer",
    "modules/queries/loader",
    "modules/profiles/loader",
    "modules/sidebar/loader",
    "modules/settings/loader",
    "modules/header/loader",
    "modules/search/loader",

//    "module/main/controller"

    //App
    "modules/templateLoader/templateLoader"

],
    function () {
        console.log("Init Main...")
        Application.module("Main", function (Main, Application, Backbone, Marionette, $, _) {
//            Application.addInitializer(function () {
            Main.addInitializer(function () {
                console.log("Start Main...")
                // load templates for this module
                Marionette.TemplateLoader.loadModuleTemplates(Main, Main.show);

                if (Backbone.history){
                    console.log("Start Backbone history...");
                    Backbone.history.start(
//                {pushState: true}
                    );
                }
            });
        });
    });