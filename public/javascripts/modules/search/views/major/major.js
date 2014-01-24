define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function(Search, Application, Backbone, Marionette, $, _) {

    Search.majorUrl = "/major";
    Search.allMajorsUrl = "/majors";
    Search.occupationUrl = "/occupation";
    Search.allOccupationsUrl = "/occupations";

    Search.addSpecializationEvt = "addSpecialization";
    Search.addOccupationEvt = "addOccupation"
    Search.createOccupationEvt = "createOccupation"



//    //Layout
    Search.views.MajorContentLayout = Marionette.Layout.extend({
        template:  "search/views/major/layout",

        regions: {
            basicInfoRegion: "#basicInfo",
            schoolPrepRegion: "#schoolPrep",
            collegeAdmissionRegion: "#collegeAdmission",
            specializationRegion: "#specializations",
            careerConnectRegion: "#careerConnect",
            occupationsRegion: "#occupations",
            salaryRegion: "#salary",
            collegeUnivRegion: "#collegeUniv",
            newOccupationRegion: "#newOccupation",
            newCollegeRegion: "#newCollege",
            addSpecializationRegion: "#addSpecialization"
        }
    });


//  Views

    var specializationHtml = "<%=args.title%>";
    Search.views.Specialization = Marionette.ItemView.extend({
        template: function(serialized_model){
//            console.log(serialized_model.title);
            return _.template(specializationHtml, {title: serialized_model.title}, {variable: 'args'})
        },
        tagName: "li"
    });


    Search.views.SpecializationComposite = Marionette.CompositeView.extend({
        itemView: Search.views.Specialization,
        template: "search/views/major/specializationView",
        itemViewContainer: "ul"
    });

    Search.views.AddSpecialization = Marionette.ItemView.extend({
       template: "search/views/major/addSpecialization",
        events: {
            "click #addSpecialization" : Search.addSpecializationEvt
        },

        onRender: function () {
            Backbone.Validation.bind(this);
        },

        addSpecialization: function(event) {
            event.preventDefault();
            this.trigger(Search.addSpecializationEvt, this);
        }
    });


    var occupationHtml = "<%=args.title%>";
    Search.views.Occupation = Marionette.ItemView.extend({
        template: function(serialized_model){
//            console.log(serialized_model.title);
            return _.template(occupationHtml, {title: serialized_model.title}, {variable: 'args'})
        },
        tagName: "li"
    });

    Search.views.OccupationComposite = Marionette.CompositeView.extend({
        template: "search/views/major/occupationsView",
        itemView: Search.views.Occupation,
        itemViewContainer: "ul",

        onRender: function(){
            if (Application.Base.isAdmin()) {
                var that = this
                var emptyText = "Add Occupation";
                this.$el.find("#addOccupations").editable({
                    source: that.options.selectOptionsList,
//                value: initialValue,
                    emptytext: emptyText,
                    type: "select2",
                    select2: {
                        placeholder: emptyText,
                        allowClear: true
                    },
                    success: function(response, id) {
                        that.trigger(Search.addOccupationEvt, id);

                    }
                });

            }
        }
    });

    Search.views.AddNewOccupation = Marionette.ItemView.extend({
        template: "search/views/major/newOccupationView",

        events: {
            "click #createOccupation": Search.createOccupationEvt
        },

        onRender: function () {
            Backbone.Validation.bind(this);
        },

        createOccupation: function (event) {
            event.preventDefault();
            this.trigger(Search.createOccupationEvt, this);
        }
    });



    /*
    Controller Section
     */

    Search.addSpecializationSelect = function() {
        var specSelect = new Search.views.SearchSelect();
        Search.searchSelectNavbar.specializationSelectRegion.show(specSelect);
        this.listenTo(specSelect, Search.streamSelectEvt, function(specializationId){
            // Show Specialization Page
        });
    };

    Search.showMajorPageById = function(majorId) {
        //Populate any data from server
        var major = new Application.Base.models.Generic({
            urlRoot: Search.majorUrl,
            id: majorId
        });
        major.fetch({async: false});
        Search.showMajorPage(major);
    };

    Search.showMajorPage = function(major) {

        // TODO: Later add specialization Select

        //Show Major Page Content
        var majorContentLayout = new Search.views.MajorContentLayout();
        Search.searchLayout.searchContent.show(majorContentLayout);

        //Basic Info
        var basicInfoView = new Search.views.BasicInfoView({
            model: major
        });
        majorContentLayout.basicInfoRegion.show(basicInfoView);

        //SchoolPrep
        var schoolPrepView = new Search.views.GenericWYSIWYGView({
            model: major,
            headingId: "schoolPrep_heading",
            headingTitle: "School Prep",
            editorId: "schoolPrepEditor",
            modelAttr: "schoolPrep",
            emptyText: "Add School Prep info...",
            value: major.toJSON().schoolPrep
        });
        majorContentLayout.schoolPrepRegion.show(schoolPrepView);

        //College Admission
        var collegeAdmissionView = new Search.views.GenericWYSIWYGView({
            model: major,
            headingId: "collegeAdmission_heading",
            headingTitle: "College Admission",
            editorId: "collegeAdmissionEditor",
            modelAttr: "admission",
            emptyText: "Add College Admission info...",
            value: major.toJSON().admission
        });
        majorContentLayout.collegeAdmissionRegion.show(collegeAdmissionView);

        //Specialization
        var specializationView = new Search.views.SpecializationComposite({
            model: major,
            collection: new Application.Base.collections.Generic(major.get(Search.SPECIALIZATIONS))
        });
        majorContentLayout.specializationRegion.show(specializationView);

        var careerConnectView = new Search.views.GenericWYSIWYGView({
            model: major,
            headingId: "careerConnect_heading",
            headingTitle: "Career Connect",
            editorId: "careerConnectEditor",
            modelAttr: "careerConnect",
            emptyText: "Add Career Connect info...",
            value: major.toJSON().careerConnect
        });
        majorContentLayout.careerConnectRegion.show(careerConnectView);

        var salaryView = new Search.views.GenericWYSIWYGView({
            model: major,
            headingId: "salary_heading",
            headingTitle: "Salary",
            editorId: "salaryEditor",
            modelAttr: "salary",
            emptyText: "Add salary info...",
            value: major.toJSON().salary
        });
        majorContentLayout.salaryRegion.show(salaryView);

        //TODO Occupations and Colleges
        Search.addOccupationsSection(majorContentLayout, major);

        if (Application.Base.isAdmin()){
            Search.addAdminSection(majorContentLayout, major)
        }
    };

    Search.addOccupationsSection = function(layout, major) {
        var allOccupations = new Application.Base.collections.Generic({
            url: Search.allOccupationsUrl
        });

        allOccupations.fetch({async:false});

        var occupView = new Search.views.OccupationComposite({
            model: major,
            collection: new Application.Base.collections.Generic(major.get("occupations")),
            selectOptionsList: Search.getIdToTitleArrayMap(allOccupations.toJSON())
        })

        layout.occupationsRegion.show(occupView);
        this.listenTo(occupView, Search.addOccupationEvt, function(id){
            console.log("Add occup: " + id);
            major.save("addOccupation", id, {
                wait: true,
                patch: true,
                success: function(newMajor){
                    console.log("Saved on server!!")
                    Search.showMajorPage(newMajor)
                },

                error: function(x, response) {
                    console.log("Error on server!! -- " + response)
                    Search.showMajorPage(major)
                }
            });
        });
    }

    Search.addAdminSection = function(layout, major) {
        //Add Specialization
        var addSpecView = new Search.views.AddSpecialization({
            model: major
        });
        layout.addSpecializationRegion.show(addSpecView);
        this.listenTo(addSpecView, Search.addSpecializationEvt, function(view){
            var data = Backbone.Syphon.serialize(view);

            console.log(data);
//            view.model.unset("url", { silent: true });
            view.model.save(data, {
                wait: true,
                patch: true,
                success: function (model) {
                    $.jGrowl("New Specialization created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                    Search.showMajorPage(model);
                },

                error: function (model, response) {
                    $.jGrowl("Error saving " + model.get("title"), {theme: 'jGrowlError'});
                    console.error("Error Model: " + model.toJSON());
                    console.error("Error Response: " + response.statusText);
                    Search.showMajorPage(model);
                }
            });
        })
        //Occupations
        Search.createNewOccupation(layout, major);

        //Colleges
    };

    Search.createNewOccupation = function(layout, major) {
        var newOccupationView = new Search.views.AddNewOccupation({
            model: new Application.Base.models.Generic({
                urlRoot: Search.occupationUrl
            })
        });

        layout.newOccupationRegion.show(newOccupationView);

        this.listenTo(newOccupationView, Search.createOccupationEvt, function(view){
            var data = Backbone.Syphon.serialize(view);
//            console.log(data);
            view.model.unset("urlRoot", { silent: true });
            view.model.save(data, {
                wait: true,
                success: function (model) {
                    $.jGrowl("New occupation created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                    Search.showMajorPage(major);
                },

                error: function (model, response) {
                    $.jGrowl("Error saving " + model.get("title"), {theme: 'jGrowlError'});
                    console.error("Error Model: " + model.toJSON());
                    console.error("Error Response: " + response.statusText);
                    Search.showMajorPage(major);
                }
            });
        })

    };
});
});