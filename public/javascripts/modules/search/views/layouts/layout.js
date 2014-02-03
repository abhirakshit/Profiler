define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function(Search, Application, Backbone, Marionette, $, _) {

    Search.views.MainLayout = Marionette.Layout.extend({
        template: "search/views/layouts/main",

        regions : {
            searchNavigation: "#searchNavigation",
            searchContent: "#searchContent"
        }
    });

});
});