Application.module("Search", function(Search, Application, Backbone, Marionette, $, _) {

    Search.views.mainLayout = Marionette.Layout.extend({
        template: "search/views/layouts/main",

        regions : {
            searchNavigation: "#searchNavigation",
            searchContent: "#searchContent"
        }
    });

});