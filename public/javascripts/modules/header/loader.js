//Application.module("Header", function(){
//    this.prefix = "header";
//    this.templatePath = "assets/javascripts/modules/";
//    this.views = {};
//    this.template = function(str) {
//        return this.prefix + '-' + str;
//    };
//
//    // This has been added to only keep class naming consistent with views.
//    this.models = {};
//    this.collections = {};
//});

//var dependencies = [
//    // Base
////    "modules/base/loader",
//
//    "modules/header/views/layouts/layout",
//    "modules/header/views/header",
//    "modules/header/controller"
//
//];

//define(dependencies,
define([
    // Base
//    "modules/base/loader",

    "modules/header/setup",
    "modules/header/views/layouts/layout",
    "modules/header/views/header",
    "modules/header/controller"

],
    function(){
    Application.module("Header", function(Header, Application, Backbone, Marionette, $, _){
        Header.addInitializer(function(){
            //Load Templates
            console.log("Init Header...")
            Marionette.TemplateLoader.loadModuleTemplates(Header, Header.show);
        });
    });
});