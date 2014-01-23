define(function(){
Application.module("Profiles", function(Profiles, Application, Backbone, Marionette, $, _) {
    Profiles.onTemplatesLoaded = function() {
        this.show();
    };

    Profiles.show = function() {
        console.log("Show Profiles...");
        Profiles.controller = new Profiles.Controller({
            region: Application.pageContent
        });

        Profiles.router = new Profiles.Router({
            controller: Profiles.controller
        })


    };

    Profiles.profileUrl = "profiles/profile";
    Profiles.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "profiles": "showProfilesHome"
        }
    });

    Profiles.Controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
            console.log('Profiles Module Initialized');
        },

        showProfilesHome: function() {
            Profiles.mainLayout = new Application.Base.views.MainLayout();
            this.region.show(Profiles.mainLayout);

            //Add views
            Profiles.addPageHeader();
            //Profiles.addNavTabs();
            Profiles.showProfile();

//            Application.Base.onHoverEditable(Profiles.mainLayout);
        }

    });

    Profiles.addPageHeader = function() {
        var headerLayoutView = new Application.Base.views.HeaderLayout();
        Profiles.mainLayout.pageHeaderRegion.show(headerLayoutView);

        //Show header
        var pgHeader = new Application.Base.views.PageHeader({
            model: new Backbone.Model({header: "Profile"})
        });
        headerLayoutView.pageHeader.show(pgHeader);

    };


//    Profiles.models.studentProfile = Marionette.Model.extend()

    Profiles.showProfile = function() {
        var userProfileView = new Profiles.views.showProfile({
            model : Application.Base.loggedUser
        })

//        Profiles.mainLayout.tabContentRegion.show(userProfileView);
        var spLayoutView = new Profiles.views.StudentProfileLayout();
        Profiles.mainLayout.tabContentRegion.show(spLayoutView);

        var institutionalView = new Profiles.views.InstitutionalView({
            model : Application.Base.loggedUser
        });
        spLayoutView.institutionRegion.show(institutionalView);

        var careerView = new Profiles.views.CareerView({
            model : Application.Base.loggedUser
        });
        spLayoutView.careerRegion.show(careerView);

        var academicView = new Profiles.views.AcademicView({
            model : Application.Base.loggedUser
        });
        spLayoutView.academicRegion.show(academicView);

//        Application.Base.onHoverEditable(spLayoutView);
        Profiles.router.navigate(Profiles.profileUrl);
    }


});
});