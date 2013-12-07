
Tracker.module("Sidebar", function(){
    this.prefix = "sidebar";
    this.templatePath = "assets/javascripts/modules/";
    this.views = {};
    this.template = function(str) {
        return this.prefix + '-' + str;
    };
});

var dependencies = [
    "modules/sidebar/views/sidebarTab",
    "modules/sidebar/controller",

    //Base
    "modules/base/loader"
];

require(dependencies, function(){
    Tracker.module("Sidebar", function(Sidebar, Tracker, Backbone, Marionette, $, _){
        Tracker.addInitializer(function(){
            //Load Templates
            console.log("Load Sidebar...")
            Marionette.TemplateLoader.loadModuleTemplates(Tracker.Sidebar, Tracker.Sidebar.show);
        });
    });
});

