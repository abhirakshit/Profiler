Application.module("Base", function(Base, Application, Backbone, Marionette, $, _) {


    Base.STUDENT_ROLE = "student";
    Base.COUNSELOR_ROLE = "counselor";
    Base.ADMIN_ROLE = "admin";
    Base.SUPER_ADMIN_ROLE = "superAdmin";

//    Base.allUsers_Url = "/user/all";
    Base.getLoggedInUser = "/user";

    Base.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "home" : "showAppHome"
        }
    })

    Base.Controller = Marionette.Controller.extend({
        showAppHome : function() {

        }
    })

    updateLoggedUser = function() {
        //Get local user
        var options = {urlRoot: Base.getLoggedInUser};
        Base.loggedUser = new Base.models.Generic([], options);
        Base.loggedUser.fetch({async : false});
//        console.dir(Base.loggedUser);
    };

    Base.onTemplatesLoaded = function() {
        Base.show();
    };

    Base.show = function(){
        console.log("Show Base...");
        Base.controller = new Base.Controller();
        Base.router = new Base.Router({
            controller: Base.controller
        });
        updateLoggedUser();
    };

    Base.showQueriesHomeEvt = "showQueriesHome";
    Base.showProfilesHomeEvt = "showProfilesHome";
    Base.showSettingsHomeEvt = "showSettingsHome";

//    Base.showAppHome = function() {
//
//    };

    Application.vent.on('all', function (evt, model) {
        if (Base.showQueriesHomeEvt == evt){
            Application.Enquiry.controller.start();
        } else if (Base.showProfilesHomeEvt == evt) {
            Application.Profiles.controller.showProfilesHome();
        } else if (Base.showSettingsHomeEvt == evt) {
            Application.Settings.controller.showSettingsHome();
        }

    });


    //JAVASCRIPTS
    // Will need later
    Base.addDataTables = function(layout) {
        //AddDataTables - Sorting, Filter etc
        layout.$el.find('.dataTable').dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "bInfo": false
        });
    };

    Base.onHoverEditable = function(layout) {
        layout.$el.find((".editable")).hover(function(){
            $(this).addClass('over');
        }, function(){
            $(this).removeClass('over');
        })
    }
});