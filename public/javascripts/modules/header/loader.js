Tracker.module("Header", function(){
    this.prefix = "header";
    this.templatePath = "assets/javascripts/modules/";
    this.views = {};
    this.template = function(str) {
        return this.prefix + '-' + str;
    };
});

var dependencies = [
    "modules/header/views/header",
    "modules/header/controller",

    // Base
    "modules/base/loader"
];

require(dependencies, function(){
    Tracker.module("Tracker.Header", function(Header, Tracker, Backbone, Marionette, $, _){
        Tracker.addInitializer(function(){
            //Load Templates
            console.log("Init Header...")
            Marionette.TemplateLoader.loadModuleTemplates(Tracker.Header, Tracker.Header.show);
        });
    });
});