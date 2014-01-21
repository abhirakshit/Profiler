Application.module("Search", function(){
    this.prefix = "search";
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
    //Base
    "modules/base/loader",

    "modules/search/views/base/base",
    "modules/search/views/base/search",
    "modules/search/views/specialization/specialization",
    "modules/search/views/stream/stream",
    "modules/search/views/major/major",
    "modules/search/views/navigation/navigation",
    "modules/search/views/layouts/layout",
    "modules/search/controller"

];

require(dependencies, function(){
    Application.module("Search", function(Search, Application, Backbone, Marionette, $, _){
        Application.addInitializer(function(){
            //Load Templates
            console.log("Load Search...")
            Marionette.TemplateLoader.loadModuleTemplates(Application.Search, Application.Search.show);
//            Application.Search.show();
        });
    });
});