define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.specializationUrl = "/specialization";
        Entities.allSpecializationsUrl = "/specializations";

        var API = {
            getAllSpecializations: function() {
                if (!Entities.allSpecializations){
                    Entities.allSpecializations = new Entities.Collection();
                    Entities.allSpecializations.url = Entities.allSpecializationsUrl;
                    Entities.allSpecializations.fetch();
                }
                return Entities.allSpecializations;
            },

            getSpecialization: function(specId) {
                var specialization = new Entities.Model();
                specialization.urlRoot = Entities.specializationUrl;
                specialization.id = specId;
                specialization.fetch();

                return specialization;
            }

        };

        Application.reqres.setHandler(Application.SPECIALIZATIONS_GET, function(){
            return API.getAllSpecializations();
        });

        Application.reqres.setHandler(Application.SPECIALIZATION_GET, function(specId){
            return API.getSpecialization(specId);
        });
    });
})