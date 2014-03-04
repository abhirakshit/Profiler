define([
    "modules/profile/profile_controller",
    "modules/loading/loading_controller"
], function(){
    Application.module("Profile", function(Profile, Application, Backbone, Marionette, $, _) {

        Profile.rootRoute = "profile";
        Profile.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "profile": "show",
                "profile/": "show"
//                "profile/:streamId": "showStream",
//                "profile/:streamId/": "showStream",
//                "profile/:streamId/:majorId/": "showMajor",
//                "profile/:streamId/:majorId": "showMajor"
            }
        });

        var API = {
            show: function() {
                console.log("Show Profile");
                new Profile.Controller({
                    region: Application.pageContentRegion
                });
                Application.commands.execute(Application.SET_SIDEBAR, Application.PROFILE_SHOW);
            }
        };

        Profile.setup = function() {
            new Profile.Router({
                controller: API
            })
        };

        Profile.on(Application.START, function () {
            console.log("Profile start...");
            Marionette.TemplateLoader.loadModuleTemplates(Profile, Profile.setup);
        });

        Application.commands.setHandler(Application.PROFILE_SHOW, function(){
            API.show();
            Application.navigate(Profile.rootRoute);
        });
    });
});
