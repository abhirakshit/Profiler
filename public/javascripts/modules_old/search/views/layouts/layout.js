define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function(Search, Application, Backbone, Marionette, $, _) {

    Search.views.Layout = Marionette.Layout.extend({
        template: "search/views/layouts/main",
//        loadingView: Application.Base.views.Loading,

//        initialize: function() {
//            this.setupMarionetteLoading();
//        },

        regions : {
            searchNavigation: "#searchNavigation",
            searchContent: "#searchContent"
        }
    });

});
});