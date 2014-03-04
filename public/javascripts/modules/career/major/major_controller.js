define([
    "modules/career/major/major_view"
], function () {
    Application.module("Career.Major", function (Major, Application, Backbone, Marionette, $, _) {

        Major.addSpecializationEvt = "addSpecialization";
        Major.addOccupationEvt = "addOccupation";
        Major.addCollegeEvt = "addCollege";
        Major.createOccupationEvt = "createOccupation";
        Major.createCollegeEvt = "createCollege";

        Major.Controller = Application.Controllers.Base.extend({
            initialize: function (options) {
                var major = Application.request(Application.MAJOR_GET, options.majorId);
                var allOccupations = Application.request(Application.OCCUPATIONS_GET);
                var allColleges = Application.request(Application.COLLEGES_GET);

                this.layout = this.getLayout();
                this.listenTo(this.layout, Application.SHOW, function () {
                    this.showBasicInfo(major);
                    this.showSchoolPrep(major);
                    this.showCollegeAdmission(major);
                    this.showSpecialization(major);
                    this.showCareerConnect(major);
                    this.showSalarySection(major);
                    this.showOccupationsSection(major, allOccupations);
                    this.showCollegesSection(major, allColleges);

                    if (Application.USER_IS_ADMIN)
                        this.showAdminSection(major);
                });

                this.show(this.layout, {
                    loading: {
                        entities: [major, allOccupations, allColleges]
                    }
                });
            },

            showAdminSection: function(major) {
                this.showAddSpecializationSection(major);
                this.showCreateNewOccupationSection(major);
                this.showCreateNewCollegeSection(major);
            },

            showCreateNewCollegeSection: function(major) {
                var that = this;
                var newCollegeView = new Major.views.AddNewCollege({
                    model: Application.request(Application.COLLEGE_GET)
                });

                this.layout.newCollegeRegion.show(newCollegeView);

                this.listenTo(newCollegeView, Major.createCollegeEvt, function(view){
                    var data = Backbone.Syphon.serialize(view);
                    view.model.save(data, {
                        wait: true,
                        success: function (model) {
                            // update occupations and get list
                            var allColleges = Application.request(Application.COLLEGES_GET, true);
                            //refresh occupationsSection
                            Application.execute(Application.WHEN_FETCHED, allColleges, function(){
                                that.showCollegesSection(major, allColleges)
                            });
                            $.jGrowl("New college created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                            that.showCreateNewCollegeSection(major);
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving college: " + data.title, {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
                            that.showCreateNewCollegeSection(major)
                        }
                    });
                })
            },

            showCreateNewOccupationSection: function(major) {
                var occupation = Application.request(Application.OCCUPATION_GET);
                var newOccupationView = new Major.views.AddNewOccupation({
                    model: occupation
                });

                this.layout.newOccupationRegion.show(newOccupationView);

                this.listenTo(newOccupationView, Major.createOccupationEvt, function(view){
                    var that = this;
                    var data = Backbone.Syphon.serialize(view);
                    view.model.unset("urlRoot", { silent: true });
                    view.model.save(data, {
                        wait: true,
                        success: function (model) {
                            // update occupations and get list
                            var allOccupations = Application.request(Application.OCCUPATIONS_GET, true);
                            //refresh occupationsSection
                            Application.execute(Application.WHEN_FETCHED, allOccupations, function(){
                                that.showOccupationsSection(major, allOccupations)
                            });
                            $.jGrowl("New occupation created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                            that.showCreateNewOccupationSection(major);
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving " + model.get("title"), {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
                            that.showCreateNewOccupationSection(major);
                        }
                    });
                })
            },


            showAddSpecializationSection: function(major) {
                //Add Specialization
                var that = this;
                var addSpecView = new Major.views.AddSpecialization({
                    model: major
                });
                this.layout.addSpecializationRegion.show(addSpecView);
                this.listenTo(addSpecView, Major.addSpecializationEvt, function(view){
                    var data = Backbone.Syphon.serialize(view);
                    view.model.save(data, {
                        wait: true,
                        patch: true,
                        success: function (model) {
                            $.jGrowl("New Specialization created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                            that.showSpecialization(major);
                            that.showAddSpecializationSection(major);
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving " + model.get("title"), {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
                            that.showAddSpecializationSection(major);
                        }
                    });
                });
            },

            showCollegesSection: function(major, allColleges) {
                var that = this;
                var collegesView = new Major.views.CollegeComposite({
                    model: major,
                    collection: new Application.Entities.SortedCollection(major.get("colleges")),
                    selectOptionsList: allColleges.getIdToTitleArrayMap()
                });

                this.layout.collegeUnivRegion.show(collegesView);
                this.listenTo(collegesView, Major.addCollegeEvt, function(collegeId){
                    major.save("addCollege", collegeId, {
                        wait: true,
                        patch: true,
                        success: function(newMajor){
                            that.showCollegesSection(newMajor, allColleges);
                        },

                        error: function(x, response) {
                            console.log("Error on server!! -- " + response)
                            that.showCollegesSection(major, allColleges);
                        }
                    });
                });
            },

            showOccupationsSection: function(major, allOccupations) {
                var that = this;
                var occupationView = new Major.views.OccupationComposite({
                    model: major,
                    collection: new Application.Entities.SortedCollection(major.get("occupations")),
                    selectOptionsList: allOccupations.getIdToTitleArrayMap()
                });

                this.layout.occupationsRegion.show(occupationView);
                this.listenTo(occupationView, Major.addOccupationEvt, function(occupId){
                    major.save("addOccupation", occupId, {
                        wait: true,
                        patch: true,
                        success: function(newMajor){
                            that.showOccupationsSection(newMajor, allOccupations);
                        },

                        error: function(x, response) {
                            console.log("Error on server!! -- " + response)
                            that.showOccupationsSection(major, allOccupations);
                        }
                    });
                });
            },

            showSalarySection: function(major) {
                var salaryView = new Major.parent.views.GenericWYSIWYGView({
                    model: major,
                    headingId: "salary_heading",
                    headingTitle: "Salary",
                    editorId: "salaryEditor",
                    modelAttr: "salary",
                    emptyText: "Add salary info...",
                    value: major.get("salary")
                });
                this.layout.salaryRegion.show(salaryView);
            },

            showCareerConnect: function(major) {
                var careerConnectView = new Major.parent.views.GenericWYSIWYGView({
                    model: major,
                    headingId: "careerConnect_heading",
                    headingTitle: "Career Connect",
                    editorId: "careerConnectEditor",
                    modelAttr: "careerConnect",
                    emptyText: "Add Career Connect info...",
                    value: major.get("careerConnect")
                });
                this.layout.careerConnectRegion.show(careerConnectView);
            },

            showSpecialization: function(major) {
                var specializationView = new Major.views.SpecializationComposite({
                    model: major,
                    collection: new Application.Entities.SortedCollection(major.get("specializations"))
                });
                this.layout.specializationRegion.show(specializationView);
            },

            showCollegeAdmission: function(major) {
                var collegeAdmissionView = new Major.parent.views.GenericWYSIWYGView({
                    model: major,
                    headingId: "collegeAdmission_heading",
                    headingTitle: "College Admission",
                    editorId: "collegeAdmissionEditor",
                    modelAttr: "admission",
                    emptyText: "Add College Admission info...",
                    value: major.get("admission")
                });
                this.layout.collegeAdmissionRegion.show(collegeAdmissionView);
            },

            showSchoolPrep: function(major) {
                var schoolPrepView = new Major.parent.views.GenericWYSIWYGView({
                    model: major,
                    headingId: "schoolPrep_heading",
                    headingTitle: "School Prep",
                    editorId: "schoolPrepEditor",
                    modelAttr: "schoolPrep",
                    emptyText: "Add School Prep info...",
                    value: major.get("schoolPrep")
                });
                this.layout.schoolPrepRegion.show(schoolPrepView);
            },

            showBasicInfo: function(major) {
                var basicInfoView = new Major.parent.views.BasicInfoView({
                    model: major
                });
                this.layout.basicInfoRegion.show(basicInfoView);
            },


            getLayout: function () {
                return new Major.views.Layout();
            }
        })
    });
});