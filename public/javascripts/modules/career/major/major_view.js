define([
    "modules/career/major/major_setup"
], function(){
    Application.module("Career.Major", function(Major, Application, Backbone, Marionette, $, _) {
        console.log("Major view reached...");
        Major.views.Layout = Application.Views.Layout.extend({
            template:  "career/major/major_layout",

            regions: {
                specializationCompositeRegion: "#specializationComposite",
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

        var specializationHtml = "<%=args.title%>";
        Major.views.Specialization = Application.Views.ItemView.extend({
            template: function(serialized_model){
                return _.template(specializationHtml, {title: serialized_model.title}, {variable: 'args'})
            },
            tagName: "li"
        });


        Major.views.SpecializationComposite = Application.Views.CompositeView.extend({
            itemView: Major.views.Specialization,
            template: "career/major/templates/specializationView",
            itemViewContainer: "ul"
        });

        var occupationHtml = "<%=args.title%>";
        Major.views.Occupation = Application.Views.ItemView.extend({
            template: function(serialized_model){
                return _.template(occupationHtml, {title: serialized_model.title}, {variable: 'args'})
            },
            tagName: "li"
        });

        Major.views.OccupationComposite = Application.Views.CompositeView.extend({
            template: "career/major/templates/occupationsView",
            itemView: Major.views.Occupation,
            itemViewContainer: "ul",

            onRender: function(){
                if (Application.USER_IS_ADMIN) {
                    var that = this
                    var emptyText = "Add Occupation - (Create new below if needed)";
                    this.$el.find("#addOccupation").editable({
                        source: that.options.selectOptionsList,
//                value: initialValue,
                        emptytext: emptyText,
                        type: "select2",
                        disabled: !Application.USER_IS_ADMIN,
                        select2: {
                            placeholder: emptyText,
                            allowClear: true
                        },
                        success: function(response, id) {
                            that.trigger(Major.addOccupationEvt, id);
                        }
                    });

                }
            }
        });

        var collegeHtml = "<%=args.title%> - <a href='<%=args.website%>' target='_blank'><%=args.website%></a>";
        Major.views.College = Marionette.ItemView.extend({
            template: function(serialized_model){
                return _.template(collegeHtml, {
                    title: serialized_model.title,
                    website: serialized_model.website
                }, {variable: 'args'})
            },
            tagName: "li"
        });

        Major.views.CollegeComposite = Marionette.CompositeView.extend({
            template: "career/major/templates/collegesView",
            itemView: Major.views.College,
            itemViewContainer: "ul",

            onRender: function(){
                if (Application.USER_IS_ADMIN) {
                    var that = this;
                    var emptyText = "Add College - (Create new below if needed)";
                    this.$el.find("#addCollege").editable({
                        source: that.options.selectOptionsList,
                        emptytext: emptyText,
                        type: "select2",
                        disabled: !Application.USER_IS_ADMIN,
                        select2: {
                            placeholder: emptyText,
                            allowClear: true
                        },
                        success: function(response, id) {
                            that.trigger(Major.addCollegeEvt, id);

                        }
                    });

                }
            }
        });

        Major.views.AddSpecialization = Application.Views.ItemView.extend({
            template: "career/major/templates/addSpecialization",
            className: "well",
            events: {
                "click #addSpecialization" : "addSpecialization"
            },

            onRender: function () {
                Backbone.Validation.bind(this);
            },

            addSpecialization: function(event) {
                event.preventDefault();
                this.trigger(Major.addSpecializationEvt, this);
            }
        });

        Major.views.AddNewOccupation = Application.Views.ItemView.extend({
            template: "career/major/templates/newOccupationView",

            events: {
                "click #createOccupation": "createOccupation"
            },

            onRender: function () {
                Backbone.Validation.bind(this);
            },

            createOccupation: function (event) {
                event.preventDefault();
                this.trigger(Major.createOccupationEvt, this);
            }
        });

        Major.views.AddNewCollege = Marionette.ItemView.extend({
            template: "career/major/templates/newCollegeView",

            events: {
                "click #createCollege": "createCollege"
            },

            onRender: function () {
                Backbone.Validation.bind(this);
            },

            createCollege: function (event) {
                event.preventDefault();
                this.trigger(Major.createCollegeEvt, this);
            }
        });

    });
});