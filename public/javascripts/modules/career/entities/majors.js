define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {

        Entities.majorUrl = "/major";
        Entities.allMajorsUrl = "/majors";

        Entities.Major = Entities.Model.extend({
            urlRoot: Entities.majorUrl,
            validation: {
                title: {required: true}
            }
        });

        Entities.MajorsCollection = Entities.TitleSortedCollection.extend({
            url: Entities.allMajorsUrl
        });

        var API = {
            getAllMajors: function(update) {
                if (!Entities.allMajors || update){
                    Entities.allMajors = new Entities.MajorsCollection();
//                    Entities.allMajors.url = Entities.allMajorsUrl;
                    Entities.allMajors.fetch();
                }
                return Entities.allMajors;
            },

            getMajor: function(majorId) {
                if (!majorId)
                    return new Entities.Major
                var major = new Entities.Major();
//                major.urlRoot = Entities.majorUrl;
                major.id = majorId;
                major.fetch();

                return major;
            }

        };

        Application.reqres.setHandler(Application.MAJORS_GET, function(update){
            return API.getAllMajors(update);
        });

        Application.reqres.setHandler(Application.MAJOR_GET, function(majorId){
            return API.getMajor(majorId);
        });
    })
});
