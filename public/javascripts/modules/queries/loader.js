//var dependencies = [
//    //Base
//    "modules/base/loader",
//
//    "modules/queries/views/query",
//    "modules/queries/controller"
//
//];

//define(dependencies,
define([

    "modules/queries/setup",
    "modules/queries/views/query",
    "modules/queries/controller"

],
    function(){
    Application.module("Queries", function(Queries, Application, Backbone, Marionette, $, _){
        Queries.addInitializer(function(){
            //Load Templates
            console.log("Load Queries...")
            Marionette.TemplateLoader.loadModuleTemplates(Queries, Queries.show);
        });
    });
});