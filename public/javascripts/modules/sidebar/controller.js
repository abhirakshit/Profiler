define(
    ["modules/sidebar/views/sidebarTab"],
    function () {
Application.module("Sidebar", function(Sidebar, Application, Backbone, Marionette, $, _) {

    Sidebar.NavSearchId = "sidebar-nav-search";
    Sidebar.NavQueriesId = "sidebar-nav-queries";
    Sidebar.NavProfilesId = "sidebar-nav-profiles";
    Sidebar.NavSettingsId = "sidebar-nav-settings";
    Sidebar.NavForumId = "sidebar-nav-forum";

    Application.Base.ForumUrl = "http://counsela.org/"

    getCounselorSideBarOptionCollection = function() {
        return new Application.Base.collections.Generic([
//            new Application.Base.models.Generic({id: Sidebar.NavSearchId, name:"Search", icon: "icon-search"}),
            new Application.Base.models.Generic({id: Sidebar.NavSearchId, name:"Home", icon: "icon-home"}),
//            new Application.Base.models.Generic({id: Sidebar.NavQueriesId, name:"Queries", icon: "icon-file"}),
//            new Application.Base.models.Generic({id: Sidebar.NavProfilesId, name:"Students", icon: "icon-user"}),
            new Application.Base.models.Generic({id: Sidebar.NavSettingsId, name:"Settings", icon: "icon-cog"}),
            new Application.Base.models.Generic({id: Sidebar.NavForumId, name:"Forum", icon: "icon-globe"})
        ]);
    }

    getStudentSideBarOptionCollection = function() {
        return new Application.Base.collections.Generic([
//            new Application.Base.models.Generic({id: Sidebar.NavSearchId, name:"Search", icon: "icon-search"}),
            new Application.Base.models.Generic({id: Sidebar.NavSearchId, name:"Home", icon: "icon-home"}),
//            new Application.Base.models.Generic({id: Sidebar.NavQueriesId, name:"Queries", icon: "icon-file"}),
//            new Application.Base.models.Generic({id: Sidebar.NavProfilesId, name:"Profile", icon: "icon-user"}),
            new Application.Base.models.Generic({id: Sidebar.NavSettingsId, name:"Settings", icon: "icon-cog"}),
            new Application.Base.models.Generic({id: Sidebar.NavForumId, name:"Forum", icon: "icon-globe"})
        ]);
    }

    Sidebar.onTemplatesLoaded = function() {
        Sidebar.show();
    };

    Sidebar.show = function(){
        var _collection;
        if (Application.Base.loggedUser.attributes.roleType == Application.Base.COUNSELOR_ROLE){
            _collection = getCounselorSideBarOptionCollection();
        } else {
            _collection = getStudentSideBarOptionCollection();
        }
        Sidebar.sidebarOptionsView = new this.views.SidebarOptions({
            collection: _collection
        });

        this.listenTo(Sidebar.sidebarOptionsView, "collectionview:itemview:sidebar-navtab:clicked",
            function(tabId){
                if (Sidebar.NavQueriesId == tabId) {
                    Sidebar.showQueriesModule();
                } else if (Sidebar.NavProfilesId == tabId) {
                    Sidebar.showProfilesModule();
                } else if (Sidebar.NavSettingsId == tabId) {
                    Sidebar.showSettingsModule();
                } else if (Sidebar.NavSearchId == tabId) {
                    Sidebar.showSearchModule();
                } else if (Sidebar.NavForumId == tabId) {
                    window.open(Application.Base.ForumUrl,'_blank');
                }
            }
        );
        Application.sidebar.show(Sidebar.sidebarOptionsView);
        Sidebar.activateSidebarTab(Sidebar.NavSearchId);
    };

    Sidebar.showQueriesModule = function() {
        Application.vent.trigger(Application.Base.showQueriesHomeEvt);
//        Sidebar.activateSidebarTab(Sidebar.NavQueriesId);
    };

    Sidebar.showProfilesModule = function() {
        Application.vent.trigger(Application.Base.showProfilesHomeEvt);
//        Sidebar.activateSidebarTab(Sidebar.NavProfilesId);
    };

    Sidebar.showSettingsModule = function() {
        Application.vent.trigger(Application.Base.showSettingsHomeEvt);
//        Sidebar.activateSidebarTab(Sidebar.NavSettingsId);
    };

    Sidebar.showSearchModule = function() {
        Application.vent.trigger(Application.Base.showSearchHomeEvt);
//        Sidebar.activateSidebarTab(Sidebar.NavSearchId);
    };

    Sidebar.activateSidebarTab = function(id) {
        Sidebar.sidebarOptionsView.selectTabView(id);
    }
});
});