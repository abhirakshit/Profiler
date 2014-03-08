define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.url = "/stream";
        Entities.allStreamsUrl = "/streams";

        Entities.Stream = Entities.Model.extend({
            urlRoot: Entities.url,
            validation: {
                title: {required: true, minLength: 4}
//                    code: { required: true}
            }
        });

//        Entities.TitleSortedCollection = Entities.Collection.extend({
//            comparator: function( collection ){
//                return( collection.get( 'title' ) );
//            }
//        });

        Entities.AllStreamsCollection = Entities.TitleSortedCollection.extend({
            url: Entities.allStreamsUrl,
            model: Entities.Stream
        });

        var API = {
            getAllStreams: function(update) {
                if (!Entities.allStreams || update){
                    Entities.allStreams = new Entities.AllStreamsCollection();
                    Entities.allStreams.fetch();
                }
                return Entities.allStreams;
            },

            getStream: function(streamId) {
                if (!streamId)
                    return new Entities.Stream();


//                if (Entities.allStreams) {
//                    Application.execute(Application.WHEN_FETCHED, Entities.allStreams, function(){
//                        return _.find(Entities.allStreams.models, function(model) {
//                            return model.get('id') == streamId;
//                        })
//                    })
//                } else {
                    var stream = new Entities.Stream();
                    stream.id = streamId;
                    stream.fetch();
                    return stream;
//                }
            }
        };

        Application.reqres.setHandler(Application.STREAMS_GET, function(update){
            return API.getAllStreams(update);
        });

        Application.reqres.setHandler(Application.STREAM_GET, function(streamId){
            return API.getStream(streamId);
        });

    });
});