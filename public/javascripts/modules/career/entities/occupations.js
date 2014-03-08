define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.occupationUrl = "/occupation";
        Entities.allOccupationsUrl = "/occupations";

        Entities.Occupation = Entities.Model.extend({
            urlRoot: Entities.occupationUrl,
            validation: {
                title: {required: true}
            }
        });

        var API = {
            getAllOccupations: function(update) {
                if (!Entities.allOccupations || update){
                    Entities.allOccupations = new Entities.TitleSortedCollection();
                    Entities.allOccupations.url = Entities.allOccupationsUrl;
                    Entities.allOccupations.fetch();
                }
                return Entities.allOccupations;
            },

            getOccupation: function(occupationId) {
                var occupation = new Entities.Occupation();
                if (!occupationId)
                    return occupation;
                occupation.id = occupationId;
                occupation.fetch();
                return occupation;
            }

//            getNewCollege: function() {
//                return new Entities.Occupation();
//            }

        };

        Application.reqres.setHandler(Application.OCCUPATIONS_GET, function(update){
            return API.getAllOccupations(update);
        });

        Application.reqres.setHandler(Application.OCCUPATION_GET, function(occupationId){
            return API.getOccupation(occupationId);
        });

//        Application.reqres.setHandler(Application.OCCUPATION_GET_NEW, function(){
//            return API.getNewCollege();
//        });
    });
});