define(function () {
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
        var pgHeader = new Application.Base.views.PageHeader({
            model: new Backbone.Model({header: "Settings"})
        });
        headerLayoutView.pageHeader.show(pgHeader);

    };


//    Settings.userUrl = "/user";
    Settings.showProfile = function() {

        var settingsLayout = new Settings.views.Layout();
        Settings.mainLayout.tabContentRegion.show(settingsLayout);


        var userProfileView = new Settings.views.Profile({
            model : Application.Base.loggedUser
        });
//        Settings.mainLayout.tabContentRegion.show(userProfileView);
        settingsLayout.profileRegion.show(userProfileView);

        //Add admin section
        if (Application.Base.isAdmin()) {
            var createAdminView = new Settings.views.CreateAdmin({
                model: new Settings.models.NewUser()
            });
            settingsLayout.adminRegion.show(createAdminView);

            this.listenTo(createAdminView, Settings.createAdminEvt, function(view){
                var model = view.model;
                var data = Backbone.Syphon.serialize(view);
                data.roleType = "admin";
//                console.log(data);
                model.set(data);
                console.log("Valid First name: " + model.isValid("firstName"));
                console.log("Valid Last name: " + model.isValid("lastName"));
                console.log("Valid email: " + model.isValid("email"));
                console.log("Valid password: " + model.isValid("password"));
                console.log("Valid Cpassword: " + model.isValid("confirmPassword"));
                console.log("Valid Model: " + model.isValid(true));

                view.model.save(data, {
                    wait: true,
                    success: function (model) {
                        console.log("Got success!!!")
                        $.jGrowl("New Admin created: " + model.get("firstName"), {theme: 'jGrowlSuccess'});
                        Settings.showProfile();
                    },

                    error: function (model, response) {
                        $.jGrowl("Error saving " + model.get("firstName"), {theme: 'jGrowlError'});
                        console.error("Error Model: " + model.toJSON());
                        console.error("Error Response: " + response.statusText);
                        Settings.showProfile();
                    }
                });
            })
        }

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
});