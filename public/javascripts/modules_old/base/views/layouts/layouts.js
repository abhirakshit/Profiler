define(["modules/base/setup"], function () {
    Application.module("Base",function (Base, Application, Backbone, Marionette, $, _) {
    // Layouts
        Base.views.PageLayout = Marionette.Layout.extend({
            template: "base/views/layouts/mainLayout",

            regions: {
                pageHeaderRegion: "#page-header",
                navigationTabsRegion: "#nav-tabs",
                tabContentRegion: "#tab-content"
            }
        });

        Base.views.HeaderLayout = Marionette.Layout.extend({
            template: "base/views/layouts/headerLayout",

            regions: {
                pageHeader: "#header",
                addEnquiryBtn: "#add-enquiry-btn"
            }
        });
    });
});

