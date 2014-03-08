define([
    "modules/sidebar/list/list_view"
], function () {
    Application.module("Sidebar.List", function (List, Application, Backbone, Marionette, $, _) {

        List.Controller = Application.Controllers.Base.extend({
            initialize: function () {
                this.sidebarView = this.getLayout();
                this.show(this.sidebarView);
            },

            getLayout: function () {
                var _collection;
                if (Application.request(Application.GET_ROLE) == Application.COUNSELOR_ROLE){
                    _collection = this.getCounselorSideBarOptionCollection();
                } else {
                    _collection = this.getStudentSideBarOptionCollection();
                }


                var options =  new List.views.SidebarOptions({
                    collection: _collection
                });

                return options;
            },

            activateSidebarTab:  function(id) {
                this.sidebarView.selectTabView(id);
            },

            getCounselorSideBarOptionCollection: function () {
                return new Application.Entities.Collection([
                    new Application.Entities.Model({id: Application.CAREER_SHOW, name: "Home", icon: "icon-home"}),
                    new Application.Entities.Model({id: Application.PROFILE_SHOW, name:"Profiles", icon: "icon-user"}),
                    new Application.Entities.Model({id: Application.SETTINGS_SHOW, name: "Settings", icon: "icon-cog"}),
                    new Application.Entities.Model({id: Application.FORUM_SHOW, name: "Forum", icon: "icon-globe"})
                ]);
            },

            getStudentSideBarOptionCollection: function () {
                return new Application.Entities.Collection([
                    new Application.Entities.Model({id: Application.CAREER_SHOW, name: "Home", icon: "icon-home"}),
                    new Application.Entities.Model({id: Application.PROFILE_SHOW, name:"Profile", icon: "icon-user"}),
                    new Application.Entities.Model({id: Application.SETTINGS_SHOW, name: "Settings", icon: "icon-cog"}),
                    new Application.Entities.Model({id: Application.FORUM_SHOW, name: "Forum", icon: "icon-globe"})
                ]);
            }
        });
    });
});
