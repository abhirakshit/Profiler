define([
    // Base
    "modules/base/loader"
],
    function(){
    Application.module("Search", function(Search, Application, Backbone, Marionette, $, _){
        require(["modules/search/controller"], function(){
            Search.addInitializer(function(){
                //Load Templates
                console.log("Load Search...")
                Marionette.TemplateLoader.loadModuleTemplates(Search, Search.start);
    //            Application.Search.show();
            });
        });
    });
});