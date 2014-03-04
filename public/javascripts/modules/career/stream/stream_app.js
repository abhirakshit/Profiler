define([
    "modules/career/stream/stream_controller"
], function(){
    Application.module("Career.Stream", function(Stream, Application, Backbone, Marionette, $, _) {

        var API = {
            list: function(region, streamId) {
                new Stream.Controller({
                    region: region,
                    streamId: streamId
                });
            }
        };

        Application.commands.setHandler(Application.STREAM_SHOW, function(region, streamId){
            API.list(region, streamId);
            Application.navigate(Stream.parent.rootRoute + "/" + streamId);
//            Application.Routers['Career'].navigate(Stream.parent.rootRoute + "/" + streamId);
        });
    });
});