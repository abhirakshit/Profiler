Tracker.module("Settings", function(Settings, Tracker, Backbone, Marionette, $, _) {
    Settings.onTemplatesLoaded = function() {
        this.show();
    };

    Settings.show = function() {
        console.log("Show Settings...");
        Settings.controller = new Settings.Controller({
            region: Tracker.pageContent
        });

        Settings.router = new Settings.Router({
            controller: Settings.controller
        })
    };

    Settings.profileUrl = "settings/profile";
    Settings.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "settings": "showSettingsHome"
        }
    });

    Settings.Controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
            console.log('Settings Module Initialized');
        },

        showSettingsHome: function() {
            Settings.mainLayout = new Tracker.Base.views.MainLayout();
            this.region.show(Settings.mainLayout);

            //Add views
            Settings.addPageHeader();
            //Settings.addNavTabs();
            Settings.showProfile();
        }

    });

    Settings.addPageHeader = function() {
        var headerLayout = new Tracker.Base.views.HeaderLayout();
        Settings.mainLayout.pageHeaderRegion.show(headerLayout);

        //Show header
        var pgHeader = new Tracker.Base.PageHeader({
            model: new Backbone.Model({header: "Settings"})
        });
        headerLayout.pageHeader.show(pgHeader);

    };

    Settings.showProfile = function() {
        var userProfile = new Settings.views.showProfile({
            model : Tracker.Base.loggedUser
        })
        Settings.mainLayout.tabContentRegion.show(userProfile);

        Settings.router.navigate(Settings.profileUrl);
    }



//    Settings.showProfile = function() {
//        var profile = new Settings.views.showProfile({
//            model: Tracker.Base.loggedUser
//        });
//        Settings.mainLayout.tabContentRegion.show(profile);
//
//        Settings.router.navigate(Settings.profileUrl);
//    };
});