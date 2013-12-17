Application.module("Profiles", function(Profiles, Application, Backbone, Marionette, $, _) {

    Profiles.views.StudentProfileLayout = Marionette.Layout.extend({

        template: "profiles/views/profile/studentProfileLayout",

        regions : {
            institutionRegion: "#institution",
            academicRegion: "#academic",
            personalRegion: "#personal"
        }
    });

    Profiles.views.InstitutionalView = Marionette.ItemView.extend({
        template: "profiles/views/profile/institutionalView"
    });

    Profiles.views.showProfile = Marionette.ItemView.extend({
        template: "profiles/views/profile/profile",

        serializeData: function(){
            this.data = this.model.toJSON();
            this.data.editProfileUrl = "editProfile";
            this.data.editPasswordUrl = "editPassword";
            return this.data;
        }
    });
});