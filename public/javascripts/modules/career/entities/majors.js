define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {

        Entities.majorUrl = "/major";
        Entities.allMajorsUrl = "/majors";

        var API = {
            getAllMajors: function() {
                if (!Entities.allMajors){
                    Entities.allMajors = new Entities.SortedCollection();
                    Entities.allMajors.url = Entities.allMajorsUrl;
                    Entities.allMajors.fetch();
                }
                return Entities.allMajors;
            },

            getMajor: function(majorId) {
                var major = new Entities.Model();
                major.urlRoot = Entities.majorUrl;
                major.id = majorId;
                major.fetch();

                return major;
            }

        };

        Application.reqres.setHandler(Application.MAJORS_GET, function(){
            return API.getAllMajors();
        });

        Application.reqres.setHandler(Application.MAJOR_GET, function(majorId){
            return API.getMajor(majorId);
        });
    })
});
