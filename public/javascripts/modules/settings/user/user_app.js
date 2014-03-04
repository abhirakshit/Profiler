define([
    "modules/settings/user/user_controller"
], function(){
    Application.module("Settings.User", function(User, Application, Backbone, Marionette, $, _) {

        User.rootRoute = "user";

//        Settings.Router = Backbone.SubRoute.extend({
//            routes: {
//                "": "show",
//                "settings": "show"
//            }
//        });

        var API = {
            show: function(region) {
                return new User.Controller({
                    region: region
                });
            }
        };

//        User.setup = function() {
//            var moduleName = Settings.rootRoute.capitalize();
//            if (!Application.Routers[moduleName])
//                Application.Routers[moduleName] = new Settings.Router(Settings.rootRoute + "/", {createTrailingSlashRoutes: true});
//        };

        Application.commands.setHandler(Application.SETTINGS_USER_SHOW, function(region){
            API.show(region);
        });
    });
});
