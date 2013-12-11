Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _) {
    Settings.onTemplatesLoaded = function() {
        this.show();
    };

    Settings.show = function() {
        console.log("Show Settings...");
        Settings.controller = new Settings.Controller({
            region: Application.pageContent
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
            Settings.mainLayout = new Application.Base.views.MainLayout();
            this.region.show(Settings.mainLayout);

            //Add views
            Settings.addPageHeader();
            //Settings.addNavTabs();
            Settings.showProfile();
        }

    });

    Settings.addPageHeader = function() {
        var headerLayoutView = new Application.Base.views.HeaderLayout();
        Settings.mainLayout.pageHeaderRegion.show(headerLayoutView);

        //Show header
        var pgHeader = new Application.Base.PageHeader({
            model: new Backbone.Model({header: "Settings"})
        });
        headerLayoutView.pageHeader.show(pgHeader);

    };

    Settings.showProfile = function() {
        var userProfileView = new Settings.views.showProfile({
            model : Application.Base.loggedUser
        })
        Settings.mainLayout.tabContentRegion.show(userProfileView);

        Settings.router.navigate(Settings.profileUrl);
    }



//    Settings.showProfile = function() {
//        var profile = new Settings.views.showProfile({
//            model: Application.Base.loggedUser
//        });
//        Settings.mainLayout.tabContentRegion.show(profile);
//
//        Settings.router.navigate(Settings.profileUrl);
//    };
});