Application.module("Sidebar", function(Sidebar, Application, Backbone, Marionette, $, _) {

    Sidebar.NavEnquiriesId = "sidebar-nav-enquiries";
    Sidebar.NavUsersId = "sidebar-nav-users";
    Sidebar.NavSettingsId = "sidebar-nav-settings";

    getSideBarOptionCollection = function() {
        return new Application.Base.collections.Generic([
            new Application.Base.models.Generic({id: Sidebar.NavEnquiriesId, name:"Students", icon: "icon-user"}),
//        new Application.Base.models.Generic({id: Sidebar.NavUsersId, name:"Users", icon: "icon-user"}),
            new Application.Base.models.Generic({id: Sidebar.NavSettingsId, name:"Settings", icon: "icon-cog"})
        ]);
    }

    Sidebar.onTemplatesLoaded = function() {
        Sidebar.show();
    };

    Sidebar.show = function(){
        Sidebar.sidebarOptionsView = new this.views.SidebarOptions({
            collection: getSideBarOptionCollection()
        });

        this.listenTo(Sidebar.sidebarOptionsView, "collectionview:itemview:sidebar-navtab:clicked",
            function(tabId){
                if (Sidebar.NavEnquiriesId == tabId) {
                    Sidebar.showEnquiryModule();
                } else if (Sidebar.NavUsersId == tabId) {
                    Sidebar.showUsersModule();
                } else if (Sidebar.NavSettingsId == tabId) {
                    Sidebar.showSettingsModule();
                }
            }
        );
        Application.sidebar.show(Sidebar.sidebarOptionsView);
        Sidebar.activateSidebarTab(Sidebar.NavEnquiriesId);
    };

    Sidebar.showEnquiryModule = function() {
        Application.vent.trigger(Application.Base.showEnquiryHomeEvt);
        Sidebar.activateSidebarTab(Sidebar.NavEnquiriesId);
    };

    Sidebar.showUsersModule = function() {
        Application.vent.trigger(Application.Base.showUsersHomeEvt);
        Sidebar.activateSidebarTab(Sidebar.NavUsersId);
    };

    Sidebar.showSettingsModule = function() {
        Application.vent.trigger(Application.Base.showSettingsHomeEvt);
        Sidebar.activateSidebarTab(Sidebar.NavSettingsId);
    };

    Sidebar.activateSidebarTab = function(id) {
        Sidebar.sidebarOptionsView.selectTabView(id);
    }
});