Application.module("Settings", function(){
    this.prefix = "settings";
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
    "modules/settings/views/profile",
    "modules/settings/controller",

    //Base
    "modules/base/loader"
];

require(dependencies, function(){
    Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _){
        Application.addInitializer(function(){
            //Load Templates
            console.log("Load Settings...")
            Marionette.TemplateLoader.loadModuleTemplates(Application.Settings, Application.Settings.show);
//            Application.Settings.show();
        });
    });
});