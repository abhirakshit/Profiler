define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.degreeUrl = "/degree";
        Entities.allDegreesUrl = "/degrees";
        Entities.allBachelorsUrl = "/degrees/bachelors";
        Entities.allMastersUrl = "/degrees/masters";
        Entities.allDoctorateUrl = "/degrees/doctorate";


        var API = {
            getAllDegrees: function() {
                if (!Entities.allDegrees){
                    this.updateAllDegrees();
                }
                return Entities.allDegrees;
            },

            updateAllDegrees: function() {
                Entities.allDegrees = new Entities.Collection();
                Entities.allDegrees.url = Entities.allDegreesUrl;
                Entities.allDegrees.fetch();
            },

            getAllBachelorsDegree: function() {
                if (!Entities.allBachelorsDegreeCollection) {
                    Entities.allBachelorsDegreeCollection = new Entities.Collection();
                    Entities.allBachelorsDegreeCollection.url = Entities.allBachelorsUrl;
                    Entities.allBachelorsDegreeCollection.fetch();
                }

                return Entities.allBachelorsDegreeCollection;
            },

            getAllMastersDegree: function() {
                if (!Entities.allMastersDegreeCollection) {
                    Entities.allMastersDegreeCollection = new Entities.Collection();
                    Entities.allMastersDegreeCollection.url = Entities.allMastersUrl;
                    Entities.allMastersDegreeCollection.fetch();
                }

                return Entities.allMastersDegreeCollection;
            },

            getAllDoctorateDegree: function() {
                if (!Entities.allDoctorateDegreeCollection) {
                    Entities.allDoctorateDegreeCollection = new Entities.Collection();
                    Entities.allDoctorateDegreeCollection.url = Entities.allDoctorateUrl;
                    Entities.allDoctorateDegreeCollection.fetch();
                }

                return Entities.allDoctorateDegreeCollection;
            }

        };

        Application.reqres.setHandler(Application.DEGREES_BACHELORS_GET, function(){
            return API.getAllBachelorsDegree();
        });

        Application.reqres.setHandler(Application.DEGREES_MASTERS_GET, function(){
            return API.getAllMastersDegree();
        });

        Application.reqres.setHandler(Application.DEGREES_DOCTORATE_GET, function(){
            return API.getAllDoctorateDegree();
        });
        
    });
});