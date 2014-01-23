//var dependencies = [
//    "modules/settings/views/profile",
//    "modules/settings/controller",
//
//    //Base
//    "modules/base/loader"
//];

//define(dependencies,
define([
    "modules/settings/setup",
    "modules/settings/views/profile",
    "modules/settings/controller"

],
    function(){
    Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _){
        Settings.addInitializer(function(){
            //Load Templates
            console.log("Load Settings...")
            Marionette.TemplateLoader.loadModuleTemplates(Settings, Settings.show);
//            Application.Settings.show();
        });
    });
});