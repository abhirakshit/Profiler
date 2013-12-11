
Application.module("Sidebar", function(){
    this.prefix = "sidebar";
    this.templatePath = "assets/javascripts/modules/";
    this.views = {};
    this.template = function(str) {
        return this.prefix + '-' + str;
    };

    // This has been added to only keep class naming consistent with views.
    this.models = {};
    this.collections = {};
});

var dependencies = [
    "modules/sidebar/views/sidebarTab",
    "modules/sidebar/controller",

    //Base
    "modules/base/loader"
];

require(dependencies, function(){
    Application.module("Sidebar", function(Sidebar, Application, Backbone, Marionette, $, _){
        Application.addInitializer(function(){
            //Load Templates
            console.log("Load Sidebar...")
            Marionette.TemplateLoader.loadModuleTemplates(Application.Sidebar, Application.Sidebar.show);
        });
    });
});

