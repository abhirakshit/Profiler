define([
    // Base
    "modules/base/loader"],
    function(){
    Application.module("Queries", function(Queries, Application, Backbone, Marionette, $, _){
        require(["modules/queries/controller"], function(){
            Queries.addInitializer(function(){
                //Load Templates
                console.log("Load Queries...")
                Marionette.TemplateLoader.loadModuleTemplates(Queries, Queries.show);
            });
        });
    });
});