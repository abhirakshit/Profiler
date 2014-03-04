define([
    "modules/career/navigation/nav_controller"
], function(){
    Application.module("Career.Navigation", function(Nav, Application, Backbone, Marionette, $, _) {
        var API = {
            list: function(region, allStreamsCollection) {
                console.log("Start Nav..");
                new Nav.Controller({
                    region: region,
                    collection: allStreamsCollection
                });
            }
        };

        Application.commands.setHandler(Application.CAREER_NAV_SHOW, function(region, allStreamsCollection){
            API.list(region, allStreamsCollection);
        });
    });
});