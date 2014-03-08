define([
    "modules/career/home/home_view",
    "modules/career/major/major_app",
    "modules/career/stream/stream_app",
    "modules/career/entities/streams",
    "modules/career/entities/colleges",
    "modules/career/entities/occupations",
    "modules/career/entities/degrees",
    "modules/career/entities/majors"
], function(){
    Application.module("Career.Home", function(Home, Application, Backbone, Marionette, $, _) {

        Home.Controller = Application.Controllers.Base.extend({
            initialize: function (options) {
                var allStreamsCollection = Application.request(Application.STREAMS_GET);

                this.layout = this.getLayout();
                this.listenTo(this.layout, Application.SHOW, function () {
                    this.showStreamLinks(allStreamsCollection);
                    this.showPageContent();

//                    if (Application.request(Application.IS_USER_ADMIN))
                    if (Application.USER_IS_ADMIN)
                        this.showAdminSection();

                });

                this.show(this.layout, {
                    loading: {
                        entities: allStreamsCollection
//                        debug: true
                    }
                });
            },

            showAdminSection: function() {
                var newStreamView = new Home.views.AddNewStream({
                    model: new Application.Entities.Stream()
                });

                this.listenTo(newStreamView, Application.STREAM_CREATE, function(view){
                    var data = Backbone.Syphon.serialize(view);

                    view.model.save(data, {
                        wait: true,
                        success: function (model) {
                            $.jGrowl("New stream created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                            var allStreams = Application.request(Application.STREAMS_GET, true);
                            //refresh occupationsSection
                            Application.execute(Application.WHEN_FETCHED, allStreams, function(){
                                Application.commands.execute(Application.CAREER_SHOW);
                            })
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving " + model.get("title") + " stream!", {theme: 'jGrowlError'});
                            console.error("Error Model: " + model);
                            console.error("Error Response: " + response.responseText);
                            Application.commands.execute(Application.CAREER_SHOW);
                        }
                    });
                });

                this.show(newStreamView, {
                    region: this.layout.adminRegion
                })
            },

            showPageContent: function () {
                var pageContentView = new Home.views.PageContent();
                this.show(pageContentView, {
                    region: this.layout.streamContentRegion
                })
            },

            showStreamLinks: function (allStreamsCollection) {
                var that = this;
                var streamLinksView = new Home.views.StreamLinkComposite({
                    collection: allStreamsCollection
                });

                this.listenTo(streamLinksView, Application.STREAM_LINK_SELECT, function(streamId){
                    Application.commands.execute(Application.STREAM_SHOW, that.region, streamId);
//                    Application.commands.execute(Application.STREAM_NAV_SHOW, streamId);
                });

                this.show(streamLinksView, {
                    region: this.layout.streamLinksRegion
                })
            },

            getLayout: function () {
                return new Home.views.Layout();
            }
        })
    });
});