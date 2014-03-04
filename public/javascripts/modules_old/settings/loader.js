//var dependencies = [
//    "modules/settings/views/profile",
//    "modules/settings/controller",
//
//    //Base
//    "modules/base/loader"
//];

//define(dependencies,
define([
    // Base
    "modules/base/loader"],
    function(){
    Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _){

        require(["modules/settings/controller"], function(){
            Settings.addInitializer(function(){
                //Load Templates
                console.log("Load Settings...")
                Marionette.TemplateLoader.loadModuleTemplates(Settings, Settings.show);
    //            Application.Settings.show();
            });
        });
    });
});