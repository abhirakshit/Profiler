Application.module("Profiles", function(){
    this.prefix = "profiles";
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
    "modules/profiles/views/profile/profile",
    "modules/profiles/controller",

    //Base
    "modules/base/loader"
];

require(dependencies, function(){
    Application.module("Profiles", function(Profiles, Application, Backbone, Marionette, $, _){
        Application.addInitializer(function(){
            //Load Templates
            console.log("Load Profiles...")
            Marionette.TemplateLoader.loadModuleTemplates(Application.Profiles, Application.Profiles.show);
//            Application.Profiles.show();
        });
    });
});