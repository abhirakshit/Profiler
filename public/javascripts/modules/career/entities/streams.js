define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.url = "/stream";
        Entities.all_Url = "/streams/all";

        Entities.Stream = Entities.Model.extend({
            urlRoot: Entities.url,
            validation: {
                title: {required: true, minLength: 4}
//                    code: { required: true}
            }
        });

        Entities.SortedCollection = Entities.Collection.extend({
            comparator: function( collection ){
                return( collection.get( 'title' ) );
            }
        });

        Entities.AllStreamsCollection = Entities.SortedCollection.extend({
            url: Entities.all_Url,
            model: Entities.Stream
        });

        var API = {
            getStreams: function() {
                if (!Entities.allStreams){
                    this.updateDegrees();
                }
                return Entities.allStreams;
            },

            updateDegrees: function() {
                Entities.allStreams = new Entities.AllStreamsCollection();
                Entities.allStreams.fetch();
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

        Application.reqres.setHandler(Application.STREAMS_GET, function(){
            return API.getStreams();
        });

        Application.reqres.setHandler(Application.STREAM_GET, function(streamId){
            return API.getStream(streamId);
        });

    });
});