Application.module("Settings", function(Settings, Application, Backbone, Marionette, $, _) {

    Settings.views.showProfile = Marionette.ItemView.extend({
        template: "settings/views/profile",

        serializeData: function(){
            this.data = this.model.toJSON();
            this.data.editProfileUrl = "editProfile";
            this.data.editPasswordUrl = "editPassword";
            return this.data;
        }
    });
});