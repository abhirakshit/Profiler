Tracker.module("Base", function(Base, Tracker, Backbone, Marionette, $, _) {

//    Base.allUsers_Url = "/user/all";
    Base.getLoggedInUser = "/user";
    Base.updateLoggedUser = function() {
        //Get local user
        var options = {urlRoot: Base.getLoggedInUser};
        Base.loggedUser = new Base.Model([], options);
        Base.loggedUser.fetch({async : false});
//        console.dir(Base.loggedUser);
    };

    Base.onTemplatesLoaded = function() {
        Base.show();
    };

    Base.show = function(){
        console.log("Show Base...");
        Base.updateLoggedUser();
    };

    Base.showUsersHomeEvt = "showUsersHome";
    Base.showEnquiryHomeEvt = "showEnquiryHome";
    Base.showSettingsHomeEvt = "showSettingsHome";

    Tracker.vent.on('all', function (evt, model) {
        if (Base.showEnquiryHomeEvt == evt){
            Tracker.Enquiry.controller.start();
        } else if (Base.showUsersHomeEvt == evt) {
            Tracker.Users.controller.showUsersHome();
        } else if (Base.showSettingsHomeEvt == evt) {
            Tracker.Settings.controller.showSettingsHome();
        }

    });

    Base.addDataTables = function(layout) {
        //AddDataTables - Sorting, Filter etc
        layout.$el.find('.dataTable').dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "bInfo": false
        });
    };
});