define(
    ["modules/settings/setup"],
    function () {
Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _) {

    Settings.createAdminEvt = "createAdmin";

    Settings.models.NewPassword = Application.Base.models.Generic.extend({
        validation: {
            password: {required: true},
            confirmPassword: {equalTo: 'password'}
        }
    });

    Settings.models.NewUser = Application.Base.models.Generic.extend({
        urlRoot: Application.Base.userUrl,
        validation: {
            firstName: {required: true},
            email: {required: true, pattern: 'email'},
            password: {required: true},
            confirmPassword: {equalTo: 'password'}
        }
    });

    Settings.views.Layout = Marionette.Layout.extend({
        template: "settings/views/layout",

        regions : {
            profileRegion: "#profileSection",
            changePasswordRegion: "#changePasswordSection",
            adminRegion: "#adminSection"
        }
    });

    Settings.changePasswordEvt = "changePassword";

    Settings.views.ChangePassword = Marionette.ItemView.extend({
        template: "settings/views/changePassword",
        events: {
            "click #changePassword": Settings.changePasswordEvt,
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

    Settings.views.UserInfo = Marionette.ItemView.extend({
        template: "settings/views/userInfo"
    });

    Settings.views.CreateAdmin = Marionette.ItemView.extend({
        template: "settings/views/createAdmin",

        events: {
            "click #createAdmin": Settings.createAdminEvt
        },

        onRender: function() {
            Backbone.Validation.bind(this);
        },

        createAdmin: function(evt) {
            evt.preventDefault();
            this.trigger(Settings.createAdminEvt, this);
        }

    })
});
});