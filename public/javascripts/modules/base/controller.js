define(function () {
Application.module("Base", function(Base, Application, Backbone, Marionette, $, _) {


    Base.STUDENT_ROLE = "student";
    Base.COUNSELOR_ROLE = "counselor";
    Base.ADMIN_ROLE = "admin";
    Base.SUPER_ADMIN_ROLE = "superAdmin";

//    Base.allUsers_Url = "/user/all";
//    Base.userUrl = "/user";
    Base.getLoggedInUser = "/user";
    Base.getAllCounselorUrl ="/users/counselors";
    Base.getAllScoolsUrl ="/schools/all";

    //This is to get the userId when user has logged in. When we log in we save a window variable so that we can call the server to get
    //the data.
    Base.loggedUserId = window.userId.replace(/&quot;/g, '')

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
//        console.log("User Id: " + Base.loggedUserId);
//        var options = {urlRoot: Base.getLoggedInUser};
//        Base.loggedUser = new Base.models.Generic([], options);
        Base.loggedUser = new Base.models.User({id: Base.loggedUserId});
        Base.loggedUser.fetch({async : false});
//        console.dir(Base.loggedUser);
    };

    Base.isAdmin = function(){
        var role = Base.loggedUser.attributes.roleType;
        if (role == Application.Base.ADMIN_ROLE || role == Application.Base.SUPER_ADMIN_ROLE)
            return true;

        return false;
    }

    Base.isSuperAdmin = function(){
        var role = Base.loggedUser.attributes.roleType;
        if (role == Application.Base.SUPER_ADMIN_ROLE)
            return true;

        return false;
    }

    populateCounselorCollection = function() {
//        var options = {url: Base.getAllCounselorUrl};
//        Base.allCounselorCollection = new Base.collections.Generic([], options);
        Base.allCounselorCollection = new Base.collections.Generic([], {url: Base.getAllCounselorUrl});
        Base.allCounselorCollection.fetch({async:false});
    };

    populateInstitutionCollection = function() {
//        var options = {url: Base.getAllScoolsUrl};
//        Base.allSchoolsCollection = new Base.collections.Generic([], options);
        Base.allSchoolsCollection = new Base.collections.Generic([], {url: Base.getAllScoolsUrl});
        Base.allSchoolsCollection.fetch({async:false});
    };


    Base.onTemplatesLoaded = function() {
        Base.show();
    };

    setUpXEditableConfig = function() {
        $.fn.editable.defaults.mode = 'inline';
        $.fn.editable.defaults.ajaxOptions = {type: "PATCH", dataType: 'json'};

        if (!Base.isAdmin() && !Base.isSuperAdmin())
            $.fn.editable.defaults.disabled = 'true';

    }

    Base.show = function(){
        console.log("Show Base...");
        Base.controller = new Base.Controller();
        Base.router = new Base.Router({
            controller: Base.controller
        });

        updateLoggedUser();
        setUpXEditableConfig();
        populateInstitutionCollection();
        populateCounselorCollection();
    };

    Base.showSearchHomeEvt = "showSearchHome";
    Base.showQueriesHomeEvt = "showQueriesHome";
    Base.showProfilesHomeEvt = "showProfilesHome";
    Base.showSettingsHomeEvt = "showSettingsHome";

//    Base.showAppHome = function() {
//
//    };

    Application.vent.on('all', function (evt, model) {
        if (Base.showQueriesHomeEvt == evt){
            Application.Queries.controller.showQueriesHome();
            Application.Sidebar.activateSidebarTab(Application.Sidebar.NavQueriesId);
        } else if (Base.showProfilesHomeEvt == evt) {
            Application.Profiles.controller.showProfilesHome();
            Application.Sidebar.activateSidebarTab(Application.Sidebar.NavProfilesId);
        } else if (Base.showSettingsHomeEvt == evt) {
            Application.Settings.controller.showSettingsHome();
            Application.Sidebar.activateSidebarTab(Application.Sidebar.NavSettingsId);
        } else if (Base.showSearchHomeEvt == evt) {
            Application.Search.controller.showSearchHome();
            Application.Sidebar.activateSidebarTab(Application.Sidebar.NavSearchId);
        }

    });

    //Utils
    Base.getCounselorName = function(id) {
        if (id) {
            var counselor = _.findWhere(Base.allCounselorCollection.toJSON(),{id: id})
            if (counselor)
                return counselor.fullName;
        }

        return "";
    }

    Base.dateViewHelper = {
        formatDate: function(date, format) {
            return moment(date).format(format);
        },

        getCurrentDate: function(format) {
            return moment().format(format);
        }
    };

    //JAVASCRIPTS
    // Will need later
    Base.addDataTables = function(layout) {
        //AddDataTables - Sorting, Filter etc
        layout.$el.find('.dataTable').dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "bInfo": false
        });

//        layout.$el.each('.dataTable').dataTable({
//            "bJQueryUI": true,
//            "sPaginationType": "full_numbers",
//            "bInfo": false
//        });
    };

    Base.onHoverEditable = function(layout) {
        layout.$el.find((".editable")).hover(function(){
//            console.log("Mouse Enter..")
            $(this).addClass('over');
        }, function(){
//            console.log("Mouse Out..")
            $(this).removeClass('over');
        })
    }
});
});