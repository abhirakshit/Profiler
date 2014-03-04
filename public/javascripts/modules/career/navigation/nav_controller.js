define([
    "modules/career/navigation/nav_view"
], function () {
    Application.module("Career.Navigation", function (Nav, Application, Backbone, Marionette, $, _) {
        Nav.Controller = Application.Controllers.Base.extend({
            initialize: function (options) {
                var allStreamsCollection = options.collection;

                this.layout = this.getNavLayout();
                this.listenTo(this.layout, Application.SHOW, function () {
                    this.showStreamSelect(allStreamsCollection);
                });

                this.show(this.layout);
            },

            showStreamSelect: function (allStreamsCollection) {
                var that = this;
//                Application.execute(Application.WHEN_FETCHED, allStreamsCollection, function () {
                    var streamSelect = new Nav.views.Select({
                        model: new Application.Entities.Model({
                            selectSpanId: "streamSelect",
                            isStream: true
                        }),
                        selectOptionsList: allStreamsCollection.getIdToTitleArrayMap(),
                        emptyText: "Select Stream...",
                        selectEvt: Application.STREAM_SELECT
                    });

                    that.layout.streamSelectRegion.show(streamSelect);
                    that.listenTo(streamSelect, Application.STREAM_SELECT, function (streamId) {
                        Application.commands.execute(Application.STREAM_SELECT, streamId);
                    });
//                });
            },

            getNavLayout: function () {
                return new Nav.views.SelectNavBar();
            }
        });
    });
});