define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.collegeUrl = "/college";
        Entities.allCollegesUrl = "/colleges";

        Entities.College = Entities.Model.extend({
            urlRoot: Entities.collegeUrl,
            validation: {
                title: {required: true},
                website: {pattern: 'url'}
            }
        });

        var API = {
            getAllColleges: function(update) {
                if (!Entities.allColleges || update){
                    Entities.allColleges = new Entities.TitleSortedCollection();
                    Entities.allColleges.url = Entities.allCollegesUrl;
                    Entities.allColleges.fetch();
                }
                return Entities.allColleges;
            },

            getOccupation: function(collegeId) {
                var college = new Entities.College();
                if (!collegeId)
                    return college;

                college.id = collegeId;
                college.fetch();
                return college;
            }

        };

        Application.reqres.setHandler(Application.COLLEGES_GET, function(update){
            return API.getAllColleges(update);
        });

        Application.reqres.setHandler(Application.COLLEGE_GET, function(collegeId){
            return API.getOccupation(collegeId);
        });

    });
});