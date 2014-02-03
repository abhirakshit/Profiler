define(function(){
    Application.module("Search", function(Search){
        this.prefix = "search";
        this.templatePath = "assets/javascripts/modules/";
        this.views = {};
        this.template = function(str) {
            return this.prefix + '-' + str;
        };

        // This has been added to only keep class naming consistent with views.
        Search.models = {};
        Search.collections = {};
    });

});