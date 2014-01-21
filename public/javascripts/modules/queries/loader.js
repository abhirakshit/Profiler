Application.module("Queries", function(){
    this.prefix = "queries";
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

    "modules/queries/views/query",
    "modules/queries/controller"

];

require(dependencies, function(){
    Application.module("Queries", function(Queries, Application, Backbone, Marionette, $, _){
        Application.addInitializer(function(){
            //Load Templates
            console.log("Load Queries...")
            Marionette.TemplateLoader.loadModuleTemplates(Application.Queries, Application.Queries.show);
//            Application.Queries.show();
        });
    });
});