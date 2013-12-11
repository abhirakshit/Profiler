Application.module("Base", function(Base, Application, Backbone, Marionette, $, _) {

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

    Base.showUsersHomeEvt = "showUsersHome";
    Base.showEnquiryHomeEvt = "showEnquiryHome";
    Base.showSettingsHomeEvt = "showSettingsHome";

//    Base.showAppHome = function() {
//
//    };

    Application.vent.on('all', function (evt, model) {
        if (Base.showEnquiryHomeEvt == evt){
            Application.Enquiry.controller.start();
        } else if (Base.showUsersHomeEvt == evt) {
            Application.Users.controller.showUsersHome();
        } else if (Base.showSettingsHomeEvt == evt) {
            Application.Settings.controller.showSettingsHome();
        }

    });

    // Will need later
    Base.addDataTables = function(layout) {
        //AddDataTables - Sorting, Filter etc
        layout.$el.find('.dataTable').dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "bInfo": false
        });
    };
});