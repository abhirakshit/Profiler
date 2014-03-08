define([
    "modules/career/stream/stream_setup"
], function(){
    Application.module("Career.Stream", function(Stream, Application, Backbone, Marionette, $, _) {

        Stream.views.Layout = Application.Views.Layout.extend({
            template: "career/stream/stream_layout",

            regions: {
                majorsCompositeRegion: "#majorsComposite",
                basicInfoRegion: "#basicInfo",
                skillsRegion: "#skills",
                degreesRegion: "#degrees",

                //Admin section
                addMajorToStreamRegion: "#addMajorToStream",
                newDegreeRegion: "#newDegree",
                newMajorRegion: "#newMajor"
            }
        });

        Stream.views.SkillsView = Application.Views.ItemView.extend({
            template: "career/stream/templates/skills",

            serializeData: function(){
                this.data = this.model.toJSON();
                this.data.heading_skills = "Skills Required";
                return this.data;
            },

            onRender: function () {
                var fieldId = "skills";
                Stream.parent.setupWYSIWIGEditor(this, fieldId, this.model.get('skills'), "Add required skills...", fieldId);
            }
        });

        Stream.views.DegreesLayout = Marionette.Layout.extend({
            template: "career/stream/templates/degreesLayout",

            regions: {
//                headingDegreeRegion: "#heading_degree",
                bachelorsRegion: "#bachelors",
                mastersRegion: "#masters",
                doctorateRegion: "#doctorate"
            }
        });

        Stream.views.Degree = Application.Views.ItemView.extend({
            template: "career/stream/templates/degreeView",

            serializeData: function() {
                this.data = this.model.toJSON();
                this.data.degreeSectionHeader = this.options.degreeSectionHeader;
                this.data.degreeSectionId = this.options.degreeSectionId;
                return this.data;
            },

            onRender: function() {
                var that = this;
                var checkListSpanId = this.options.degreeSectionId;
                this.$el.find("#" + checkListSpanId).editable({
                    type: "checklist",
                    source: that.options.checklistSource,
                    disabled: !Application.USER_IS_ADMIN,
                    emptytext: "Add degrees (Create new below...)",
                    value: that.options.value,
                    success: function (response, value) {
                        console.log(value.concat(that.options.addOnIdArr));
                        that.model.save(Stream.DEGREES, value.concat(that.options.addOnIdArr), {
                            patch: true,
                            success: function (stream) {
                                that.trigger(Stream.updateDegreesEvt, stream);
                            },

                            error: function (x, response) {
                                console.dir(response);
                                console.log("Error on server!! -- " + response);
                                return response;
                            }
                        })
                    }
                })
            }
        });


        /**
         *
         * ADMIN SECTION
         */
        var addMajorToStreamHtml = "<h3>Admin Section</h3><legend>AddMajorToStream</legend><span id='addMajor'></span>"
        Stream.views.AddMajorToStream = Application.Views.ItemView.extend({
            template: function (serialized_model) {
                return _.template(addMajorToStreamHtml, {}, {variable: 'args'})
            },

            onRender: function() {
                var that = this;
                this.$el.find('#addMajor' ).editable({
                    source: that.options.source,
                    emptytext: "Add Major to stream (Create new below...)",
                    type: "select2",
                    disabled: !Application.USER_IS_ADMIN,
                    select2: {
                        placeholder: 'Add Major',
                        allowClear: true
                    },
                    success: function(response, id) {
                        console.log(id);
                        that.model.save("major", id, {
                            patch: true,
                            success: function (newModel) {
                                $.jGrowl("New major added: " + newModel.get("title"), {theme: 'jGrowlSuccess'});
                                console.log("Saved on server!!")
                                that.trigger(Application.UPDATE_VIEW, that);
                            },

                            error: function (x, response) {
                                $.jGrowl("Error saving major!", {theme: 'jGrowlError'});
                                console.dir(response);
                                console.log("Error on server!! -- " + response);
                                return response;
                            }
                        })
                    }
                });
            }
        });

        Stream.views.AddNewDegree = Application.Views.ItemView.extend({
            template: "career/stream/templates/newDegree",

            events: {
                "click #createDegree": "createDegree"
            },

            onRender: function () {
                Backbone.Validation.bind(this);
            },

            createDegree: function (event) {
                event.preventDefault();
                this.trigger(Stream.createDegreeEvt, this);
            }
        });

        Stream.views.AddNewMajor = Application.Views.ItemView.extend({
            template: "career/stream/templates/newMajor",

            events: {
                "click #createMajor": "createMajor"
            },

            onRender: function () {
                Backbone.Validation.bind(this);
            },

            createMajor: function (event) {
                event.preventDefault();
                this.trigger(Stream.createMajorEvt, this);
            }
        });


        var searchLinkHtml = '<a><%=args.linkText%></a>';
        Stream.views.MajorLink = Application.Views.ItemView.extend({
            template: function (serialized_model) {
                return _.template(searchLinkHtml, {linkText: serialized_model.title}, {variable: 'args'})
            },

            tagName: "li",

            events: {
                "click": "clicked"
            },

            clicked: function(evt) {
                evt.preventDefault();
                this.trigger(Stream.selectedLinkEvt, this);
            }
        });

        Stream.views.MajorLinkComposite = Application.Views.CompositeView.extend({
            template: "career/stream/templates/majorComposite",
            itemView: Stream.views.MajorLink,
            className: "streamLinkComposite",
            itemViewContainer: "ul",

            initialize: function(){
                var that = this;
                this.on(Application.CHILD_VIEW + ":" + Stream.selectedLinkEvt, function(childView){
                    that.trigger(Stream.selectedLinkEvt, childView.model.get('id'));
                });
            }
        });

    });
});