define([
    "modules/career/major/major_controller"
], function(){
    Application.module("Career.Major", function(Major, Application, Backbone, Marionette, $, _) {
        var API = {
            list: function(region, majorId) {
                new Major.Controller({
                    region: region,
                    majorId: majorId
                });
            }
        };

        Application.commands.setHandler(Application.MAJOR_SHOW, function(region, streamId, majorId){
            API.list(region, majorId);
            Application.navigate(Major.parent.rootRoute + "/" + streamId + "/" + majorId);
        });
    });
});