define([
    // Base
    "modules/base/loader"],
    function(){
    Application.module("Profiles", function(Profiles, Application, Backbone, Marionette, $, _){
        require(["modules/profiles/controller"], function(){
            Profiles.addInitializer(function(){
                //Load Templates
                console.log("Load Profiles...")
                Marionette.TemplateLoader.loadModuleTemplates(Profiles, Profiles.show);
    //            Application.Profiles.show();
            });
        })
    });
});