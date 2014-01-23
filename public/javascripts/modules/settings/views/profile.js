define(function () {
Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _) {

    Settings.createAdminEvt = "createAdmin";

    //Models
    Settings.models.User = Application.Base.models.Generic.extend({
        validation: {
            firstName: {required: true},
            lastName: {required: true},
            email: {required: true, pattern: "email"},
            password: {required: true},
            confirmPassword: {equalTo: 'password'}
        }
    })

    Settings.views.Layout = Marionette.Layout.extend({
        template: "settings/views/layout",

        regions : {
            profileRegion: "#profileSection",
            adminRegion: "#adminSection"
        }
    });

    Settings.views.Profile = Marionette.ItemView.extend({
        template: "settings/views/profile",

        serializeData: function(){
            this.data = this.model.toJSON();
            this.data.editProfileUrl = "editProfile";
            this.data.editPasswordUrl = "editPassword";
            return this.data;
        }
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
            console.log("Create Admin");
            this.trigger(Settings.createAdminEvt, this);
        }

    })
});
});