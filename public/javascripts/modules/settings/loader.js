Tracker.module("Settings", function(){
    this.prefix = "settings";
    this.templatePath = "assets/javascripts/modules/";
    this.views = {};
    this.template = function(str) {
        return this.prefix + '-' + str;
    };
});

var dependencies = [
    "modules/settings/views/profile",
    "modules/settings/controller",

    //Base
    "modules/base/loader"
];

require(dependencies, function(){
    Tracker.module("Settings", function(Settings, Tracker, Backbone, Marionette, $, _){
        Tracker.addInitializer(function(){
            //Load Templates
            console.log("Load Settings...")
            Marionette.TemplateLoader.loadModuleTemplates(Tracker.Settings, Tracker.Settings.show);
//            Tracker.Settings.show();
        });
    });
});