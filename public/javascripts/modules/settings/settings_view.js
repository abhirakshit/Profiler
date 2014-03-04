define([
    "modules/settings/settings_setup"
], function(){
    Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _) {
        Settings.views.Layout = Application.Views.Layout.extend({
            template: "settings/templates/settings_layout",

            regions : {
                profileRegion: "#profileSection",
                changePasswordRegion: "#changePasswordSection",
                adminRegion: "#adminSection"
            }
        });

        Settings.views.UserInfo = Application.Views.ItemView.extend({
            template: "settings/templates/userInfo"
        });

        Settings.views.ChangePassword = Application.Views.ItemView.extend({
            template: "settings/templates/change_password",
            events: {
                "click #changePassword": "changePassword",
                "click #cancelBtn": "toggleChangePassword",
                "click #changePasswordBtn": "toggleChangePassword"
            },

            onRender: function() {
                Backbone.Validation.bind(this);
            },

            changePassword: function(event) {
                event.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.model.set(data);
                console.log(this.model.isValid(true));
                if (!this.model.isValid(true))
                    return;

                this.trigger(Settings.changePasswordEvt, this);
                this.toggleChangePassword(event);
            },

            toggleChangePassword: function(event) {
                event.preventDefault();
                this.$el.find("#changePasswordContainer").fadeToggle();
            }
        });

        Settings.views.CreateAdmin = Application.Views.ItemView.extend({
            template: "settings/templates/create_admin",

            events: {
                "click #createAdmin": "createAdmin"
            },

            onRender: function() {
                Backbone.Validation.bind(this);
            },

            createAdmin: function(evt) {
                evt.preventDefault();
                this.trigger(Settings.createAdminEvt, this);
            }

        })
    })
});