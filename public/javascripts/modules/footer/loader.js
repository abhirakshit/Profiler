define([
    // Base
    "modules/base/loader"
],
function(){
    Application.module("Footer", function(Footer, Application, Backbone, Marionette, $, _){
        require(["modules/footer/controller"], function () {
            Footer.addInitializer(function(){
                //Load Templates
                console.log("Init Footer...")
                Marionette.TemplateLoader.loadModuleTemplates(Footer, Footer.show);
            });
        });
    });
});