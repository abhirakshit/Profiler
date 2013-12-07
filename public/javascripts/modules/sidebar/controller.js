Tracker.module("Sidebar", function(Sidebar, Tracker, Backbone, Marionette, $, _) {

    Sidebar.SidebarTab = Backbone.Model.extend();
    Sidebar.SidebarNav = Backbone.Collection.extend({
        model: Sidebar.SidebarTab
    });


    Sidebar.NavEnquiriesId = "sidebar-nav-enquiries";
    Sidebar.NavUsersId = "sidebar-nav-users";
    Sidebar.NavSettingsId = "sidebar-nav-settings";

    var tabCollection = new Sidebar.SidebarNav([
        new Sidebar.SidebarTab({id: Sidebar.NavEnquiriesId, name:"Students", icon: "icon-user"}),
//        new Sidebar.SidebarTab({id: Sidebar.NavUsersId, name:"Users", icon: "icon-user"}),
        new Sidebar.SidebarTab({id: Sidebar.NavSettingsId, name:"Settings", icon: "icon-cog"})
    ]);

    Sidebar.onTemplatesLoaded = function() {
        Sidebar.show();
    };

    Sidebar.show = function(){
        Sidebar.sidebarCollection = new this.views.SidebarCollection({
            collection: tabCollection
        });

        this.listenTo(Sidebar.sidebarCollection, "collectionview:itemview:sidebar-navtab:clicked",
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
        Tracker.sidebar.show(Sidebar.sidebarCollection);
        Sidebar.activateSidebarTab(Sidebar.NavEnquiriesId);
    };

    Sidebar.showEnquiryModule = function() {
        Tracker.vent.trigger(Tracker.Base.showEnquiryHomeEvt);
        Sidebar.activateSidebarTab(Sidebar.NavEnquiriesId);
    };

    Sidebar.showUsersModule = function() {
        Tracker.vent.trigger(Tracker.Base.showUsersHomeEvt);
        Sidebar.activateSidebarTab(Sidebar.NavUsersId);
    };

    Sidebar.showSettingsModule = function() {
        Tracker.vent.trigger(Tracker.Base.showSettingsHomeEvt);
        Sidebar.activateSidebarTab(Sidebar.NavSettingsId);
    };

    Sidebar.activateSidebarTab = function(id) {
        Sidebar.sidebarCollection.selectTabView(id);
    }
});