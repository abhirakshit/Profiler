define([
    "modules/career/career_view",
    "modules/career/navigation/nav_app",
    "modules/career/home/home_app"
//    "modules/career/stream/stream_app"
], function(){
    Application.module("Career", function(Career, Application, Backbone, Marionette, $, _) {

        Career.Controller = Application.Controllers.Base.extend({
            initialize: function() {
                this.layout = this.getLayout();
//                var allStreamsCollection = Application.request(Application.STREAMS_GET);

                this.listenTo(this.layout, "show", function(){
//                    this.showNavigation(allStreamsCollection);
                    this.showHomeContent();
                });

//                this.setupNavigationHandlers();

                this.show(this.layout);
            },

//            setupNavigationHandlers: function() {
//                var that = this;
//                Application.commands.setHandler(Application.STREAM_SELECT, function(streamId){
//                   Application.execute(Application.STREAM_SHOW, that.layout.tabContentRegion, streamId);
//                });
//            },

//            showNavigation: function(allStreamsCollection) {
//                Application.execute(Application.CAREER_NAV_SHOW, this.layout.navigationTabsRegion, allStreamsCollection);
//            },

            showHomeContent: function() {
                Application.execute(Application.CAREER_CONTENT_SHOW, this.layout.tabContentRegion);
            },

            getLayout: function () {
                return new Career.views.Layout();
            }
        });

    });
});