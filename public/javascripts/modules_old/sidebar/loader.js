//define([
//    "modules/sidebar/setup",
//    "modules/sidebar/views/sidebarTab",
//    "modules/sidebar/controller"
//
////    //Base
////    "modules/base/loader"
//],
//
//    function(){
//    Application.module("Sidebar", function(Sidebar, Application, Backbone, Marionette, $, _){
//        Sidebar.addInitializer(function(){
//            //Load Templates
//            console.log("Load Sidebar...")
//            Marionette.TemplateLoader.loadModuleTemplates(Sidebar, Sidebar.show);
//        });
//    });
//});
//



define([
// Base
    "modules/base/loader"
],

    function(){
        Application.module("Sidebar", function(Sidebar, Application, Backbone, Marionette, $, _){
            require(["modules/sidebar/controller"], function(){
                Sidebar.addInitializer(function(){
                    //Load Templates
                    console.log("Load Sidebar...")
                    Marionette.TemplateLoader.loadModuleTemplates(Sidebar, Sidebar.show);
                });
            });
        });
    });
