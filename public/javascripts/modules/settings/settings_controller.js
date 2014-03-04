define([
    "modules/settings/settings_view",
    "modules/entities/user"
//    "modules/settings/user/user_app"
], function () {
    Application.module("Settings", function (Settings, Application, Backbone, Marionette, $, _) {

        Settings.changePasswordEvt = "changePassword";
        Settings.createAdminEvt = "createAdmin";

        Settings.Controller = Application.Controllers.Base.extend({
            initialize: function () {
                var user = Application.request(Application.GET_LOGGED_USER);
                this.layout = this.getLayout();
                this.listenTo(this.layout, Application.SHOW, function(){
                    this.showUserInfoSection(user);
                    this.showChangePasswordSection(user);
                        if (Application.USER_IS_ADMIN)
                        this.showAdminSection(user);

                });

                this.show(this.layout, {
                    loading: {
                        entities: user
                    }
                });
            },

            showAdminSection: function(user) {
                var createAdminView = new Settings.views.CreateAdmin({
                    model: Application.request(Application.GET_USER)
                });
                this.layout.adminRegion.show(createAdminView);

                this.listenTo(createAdminView, Settings.createAdminEvt, function(view){
                    var data = Backbone.Syphon.serialize(view);
                    data.roleType = Application.ADMIN_ROLE;

                    view.model.save(data, {
                        wait: true,
                        success: function (model) {
                            console.log("Got success!!!")
                            $.jGrowl("New Admin created: " + model.get("firstName"), {theme: 'jGrowlSuccess'});
//                            Settings.showProfile();
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving " + model.get("firstName"), {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
//                            Settings.showProfile();
                        }
                    });
                });
            },

            showUserInfoSection: function(user) {
                var userInfoView = new Settings.views.UserInfo({
                    model : user
                });
                this.layout.profileRegion.show(userInfoView);
            },

            showChangePasswordSection: function(user) {
                var changePasswordView = new Settings.views.ChangePassword({
                    model : Application.request(Application.GET_PASSWORD)
                });
                this.layout.changePasswordRegion.show(changePasswordView);

                this.listenTo(changePasswordView, Settings.changePasswordEvt, function(view){
                    var data = Backbone.Syphon.serialize(view);

                    console.log(data);
                    user.save(data, {
                        wait: true,
                        patch: true,
                        success: function (model) {
                            $.jGrowl("Password Changed!!!", {theme: 'jGrowlSuccess'});
                        },

                        error: function (model, response) {
                            $.jGrowl("Error changing password", {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
                        }
                    });
                });
            },

            getLayout: function () {
                return new Settings.views.Layout();
            }
        });
    })
});