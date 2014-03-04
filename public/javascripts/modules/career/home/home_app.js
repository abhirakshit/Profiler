define([
    "modules/career/home/home_controller"
], function(){
    Application.module("Career.Home", function(Home, Application, Backbone, Marionette, $, _) {
        var API = {
            list: function(region) {
                new Home.Controller({
                    region: region
                });
            }
        };

        Application.commands.setHandler(Application.CAREER_CONTENT_SHOW, function(region){
            API.list(region);
//            var parent = Home.parent;
//            Application.Routers[parent.prefix].navigate(parent.rootRoute);
        });
    });
});