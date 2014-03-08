define([
    "modules/career/stream/stream_view"
], function () {
    Application.module("Career.Stream", function (Stream, Application, Backbone, Marionette, $, _) {

        Stream.BACHELORS = "bachelors";
        Stream.MASTERS = "masters";
        Stream.DOCTORATE = "doctorate";
        Stream.DEGREES = "degrees";

        Stream.createMajorEvt = "createMajor";
        Stream.createDegreeEvt = "createDegree";
        Stream.updateDegreesEvt = "updateDegreesSection";
        Stream.selectedLinkEvt = "selectedLink";

        Stream.Controller = Application.Controllers.Base.extend({
            initialize: function (options) {
                var stream = Application.request(Application.STREAM_GET, options.streamId);
                var allMajors = Application.request(Application.MAJORS_GET);
                var allBachelors = Application.request(Application.DEGREES_BACHELORS_GET);
                var allMasters = Application.request(Application.DEGREES_MASTERS_GET);
                var allDoctorate = Application.request(Application.DEGREES_DOCTORATE_GET);

                this.layout = this.getLayout();
                this.listenTo(this.layout, Application.SHOW, function () {
                    this.showBasicInfo(stream);
                    this.showSkillsSection(stream);
                    this.showDegreesSection(stream, allBachelors, allMasters, allDoctorate);

                    this.showMajorsSection(stream);

                    if (Application.USER_IS_ADMIN)
                        this.showAdminSection(stream, allMajors);
                });

                this.show(this.layout, {
                    loading: {
                        entities: [stream, allMajors, allBachelors, allMasters, allDoctorate]
                    }
                });
            },

            showMajorsSection: function(stream) {
                var that = this;
                var majorLinksComposite = new Stream.views.MajorLinkComposite({
                    collection: new Application.Entities.TitleSortedCollection(stream.get('majors')),
                    model: new Application.Entities.Model({
                        headingText: "Majors",
                        contentId: "majors"
                    })
                });
                this.layout.majorsCompositeRegion.show(majorLinksComposite);
                this.listenTo(majorLinksComposite, Stream.selectedLinkEvt, function(majorId){
                    Application.commands.execute(Application.MAJOR_SHOW, that.region, stream.get("id"), majorId);
                })
            },

            showAdminSection: function(stream, allMajors) {
                this.addMajorToStream(stream, allMajors);
                this.createNewDegree(stream, allMajors);
                this.createNewMajor(stream, allMajors);
            },

            createNewMajor: function(stream, allMajors) {
                var that = this;
//                var newMajor = new Application.Entities.Model();
//                newMajor.urlRoot = Application.Entities.majorUrl;
                var newMajorView = new Stream.views.AddNewMajor({
                    model: Application.request(Application.MAJOR_GET)
                });
                this.layout.newMajorRegion.show(newMajorView);

                this.listenTo(newMajorView, Stream.createMajorEvt, function(view){
                    var data = Backbone.Syphon.serialize(view);

                    console.log(data);
//                    view.model.unset("urlRoot", { silent: true });
                    view.model.save(data, {
                        wait: true,
                        success: function (model) {
                            $.jGrowl("New degree created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                            var updatedMajors = Application.request(Application.MAJORS_GET, true);
                            //refresh occupationsSection
                            Application.execute(Application.WHEN_FETCHED, updatedMajors, function(){
                                that.showAdminSection(stream, updatedMajors);
                            });
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving " + model.get("title") + " degree!", {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
                            that.showAdminSection(stream, allMajors);
                        }
                    });
                })
            },

            createNewDegree: function(stream, allMajors) {
                var that = this;
                var newDegree = new Application.Entities.Model();
                newDegree.urlRoot = Application.Entities.degreeUrl;
                var newDegreeView = new Stream.views.AddNewDegree({
                    model: newDegree
                });
                this.layout.newDegreeRegion.show(newDegreeView);

                this.listenTo(newDegreeView, Stream.createDegreeEvt, function(view){
                    var data = Backbone.Syphon.serialize(view);

                    console.log(data);
                    view.model.unset("urlRoot", { silent: true });
                    view.model.save(data, {
                        wait: true,
                        success: function (model) {
                            $.jGrowl("New degree created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                            that.showDegreesSection(stream);
                            that.showAdminSection(stream, allMajors);
                        },

                        error: function (model, response) {
                            $.jGrowl("Error saving " + model.get("title") + " degree!", {theme: 'jGrowlError'});
                            console.error("Error Model: " + model.toJSON());
                            console.error("Error Response: " + response.statusText);
                            that.showAdminSection(stream, allMajors);
                        }
                    });
                })
            },

            addMajorToStream: function (stream, allMajors) {
                var that = this;
                var aMToStreamView = new Stream.views.AddMajorToStream({
                    model: stream,
                    source: allMajors.getIdToTitleArrayMap()
                });
                this.layout.addMajorToStreamRegion.show(aMToStreamView);

                this.listenTo(aMToStreamView, Application.UPDATE_VIEW, function(view) {
                    Application.execute(Application.STREAM_SHOW, that.region, stream.get('id'));
                })
            },

            showBasicInfo: function(stream) {
                var basicInfoView = new Stream.parent.views.BasicInfoView({
                    model: stream
                });
                this.layout.basicInfoRegion.show(basicInfoView);
            },

            showSkillsSection: function(stream) {
                var skillsView = new Stream.views.SkillsView({
                    model: stream
                });
                this.layout.skillsRegion.show(skillsView);
            },

            showDegreesSection: function(stream, allBachelors, allMasters, allDoctorate) {
                var degreesLayout = new Stream.views.DegreesLayout();
                this.layout.degreesRegion.show(degreesLayout);

                var bachelorIdArr = _.pluck(
                    _.filter(stream.get('degrees'), function(degree){
                        return degree.type == Stream.BACHELORS;
                    }), "id");

                var mastersIdArr = _.pluck(
                    _.filter(stream.get('degrees'), function(degree){
                        return degree.type == Stream.MASTERS;
                    }), "id");

                var doctorateIdArr = _.pluck(
                    _.filter(stream.get('degrees'), function(degree){
                        return degree.type == Stream.DOCTORATE;
                    }), "id");

                // Show all Degrees applicable
                var that = this;
                    if (_.size(allBachelors.models) > 0) {
                        var bachelorsView = that.getDegreeChecklistView(degreesLayout, stream, "Bachelors", Stream.BACHELORS,
                            allBachelors, bachelorIdArr, mastersIdArr.concat(doctorateIdArr));
                        degreesLayout.bachelorsRegion.show(bachelorsView);
                    }

                    if (_.size(allMasters.models) > 0) {
                        var mastersView = that.getDegreeChecklistView(degreesLayout, stream, "Masters", Stream.MASTERS,
                            allMasters, mastersIdArr, bachelorIdArr.concat(doctorateIdArr));
                        degreesLayout.mastersRegion.show(mastersView);
                    }

                    if (_.size(allDoctorate.models) > 0) {
                        var doctorateView = that.getDegreeChecklistView(degreesLayout, stream, "Doctorate", Stream.DOCTORATE,
                            allDoctorate, doctorateIdArr, bachelorIdArr.concat(mastersIdArr));
                        degreesLayout.doctorateRegion.show(doctorateView);
                    }
            },

            getDegreeChecklistView: function (degreesLayout, stream, degreeSectionHeader, degreeSectionId, allDegreeCollection, valueIdArr, addOnIdArr) {
                var degreeView = new Stream.views.Degree({
                    model: stream,
                    degreeSectionHeader: degreeSectionHeader,
                    degreeSectionId: degreeSectionId,
                    checklistSource: allDegreeCollection.getValueToTitleArrayMap(),
                    value: valueIdArr,
                    addOnIdArr: addOnIdArr
                });

                this.listenTo(degreeView, Stream.updateDegreesEvt, function (updatedStream) {
                    this.showDegreesSection(updatedStream);
                });

                return degreeView;
            },

            getLayout: function () {
                return new Stream.views.Layout();
            }
        })
    });
});