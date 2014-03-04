define([
    "modules/header/loader",
    "modules/sidebar/loader",
    "modules/search/loader",
    "modules/settings/loader",
    "modules/footer/loader",
    "modules/queries/loader",
    "modules/profiles/loader"

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