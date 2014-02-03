define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function (Search, Application, Backbone, Marionette, $, _) {

    Search.streamUrl = "/stream";
    Search.allStreamsUrl = "/streams/all";

//    Search.majorUrl = "/major";

    Search.degreeUrl = "/degree";
    Search.allDegreesUrl = "/degrees";
    Search.allBachelorsUrl = "/degrees/bachelors";
    Search.allMastersUrl = "/degrees/masters";
    Search.allDoctorateUrl = "/degrees/doctorate";

    Search.createMajorEvt = "createMajor";
    Search.createDegreeEvt = "createDegree";
    Search.updateDegreesEvt = "updateDegreesSection";


    //Models
    Search.models.Stream = Backbone.Model.extend({
        urlRoot: Search.streamUrl,
        validation: {
            title: {required: true, minLength: 4}
//                    code: { required: true}
        }
    })

    Search.collections.AllStreamsCollection = Backbone.Collection.extend({
        url: Search.allStreamsUrl,
        model: Search.models.Stream
    })

    //Layouts
    Search.views.StreamContentLayout = Marionette.Layout.extend({
        template: "search/views/stream/layout",

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

    Search.views.StreamDegreesLayout = Marionette.Layout.extend({
        template: "search/views/stream/degreesLayout",

        regions: {
            headingDegreeRegion: "#heading_degree",
            bachelorsRegion: "#bachelors",
            mastersRegion: "#masters",
            doctorateRegion: "#doctorate"
        }
    });


//    //ItemViews
    Search.views.SkillsView = Marionette.ItemView.extend({
        template: "search/views/stream/skills",

        serializeData: function(){
            this.data = this.model.toJSON();
            this.data.heading_skills = "Skills Required";
            return this.data;
        },

        onRender: function () {
            var fieldId = "skills";
            Search.setupWYSIWIGEditor(this, fieldId, this.model.toJSON().skills, "Add required skills...", fieldId);
        }
    });

    var degreeHeadingHtml = "<%=args.heading_degree%><hr>";
    Search.views.StreamDegreeHeading = Marionette.ItemView.extend({
        tagName: "div",
        className: "sectionHeader",
        template: function (serialized_model) {
            return _.template(degreeHeadingHtml, {heading_degree: serialized_model.heading_degree}, {variable: 'args'})
        }
    })

    Search.views.Degree = Marionette.ItemView.extend({
        template: "search/views/stream/degreeView",

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
                emptytext: "Add degrees (Create new below...)",
                value: that.options.value,
                success: function (response, value) {
                    console.log(value.concat(that.options.addOnIdArr));
                    that.model.save(Search.DEGREES, value.concat(that.options.addOnIdArr), {
//                        wait: true,
                        patch: true,
                        success: function (stream) {
                            console.log("Saved on server!!")
//                            console.dir(newModel)
                            that.trigger(Search.updateDegreesEvt, stream);
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



    //Admin Section Views
    Search.views.AddNewDegree = Marionette.ItemView.extend({
        template: "search/views/stream/newDegree",

        events: {
            "click #createDegree": Search.createDegreeEvt
        },

        onRender: function () {
            Backbone.Validation.bind(this);
        },

        createDegree: function (event) {
            event.preventDefault();
            this.trigger(Search.createDegreeEvt, this);
        }
    });

    Search.views.AddNewMajor = Marionette.ItemView.extend({
        template: "search/views/stream/newMajor",

        events: {
            "click #createMajor": Search.createMajorEvt
        },

        onRender: function () {
            Backbone.Validation.bind(this);
        },

        createMajor: function (event) {
            event.preventDefault();
            this.trigger(Search.createMajorEvt, this);
        }
    });


    var addMajorToStreamHtml = "<h3>Admin Section</h3><legend>AddMajorToStream</legend><span id='addMajor'></span>"
    Search.views.AddMajorToStream = Marionette.ItemView.extend({
        template: function (serialized_model) {
            return _.template(addMajorToStreamHtml, {}, {variable: 'args'})
        },

        onRender: function() {
            var that = this;
            this.$el.find('#addMajor' ).editable({
                source: Search.getIdToTitleArrayMap(Search.allMajorsCollection.toJSON()),
                emptytext: "Add Major to stream (Create new below...)",
                type: "select2",
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
//                            console.dir(newModel)
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

    //Controller

    Search.createNewDegree = function(layout) {
        var newDegreeView = new Search.views.AddNewDegree({
            model: new Application.Base.models.Generic({
                urlRoot: Search.degreeUrl
            })
        });
        layout.newDegreeRegion.show(newDegreeView);

        this.listenTo(newDegreeView, Search.createDegreeEvt, function(view){
            var data = Backbone.Syphon.serialize(view);

            console.log(data);
            view.model.unset("urlRoot", { silent: true });
            view.model.save(data, {
                wait: true,
                success: function (model) {
                    $.jGrowl("New degree created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                    Search.addStreamAdminSection(layout);
                },

                error: function (model, response) {
                    $.jGrowl("Error saving " + model.get("title") + " degree!", {theme: 'jGrowlError'});
                    console.error("Error Model: " + model.toJSON());
                    console.error("Error Response: " + response.statusText);
                    Search.addStreamAdminSection(layout);
                }
            });
        })
    };

    Search.createNewMajor = function(layout) {
        var newMajorView = new Search.views.AddNewMajor({
            model: new Application.Base.models.Generic({
                urlRoot: Search.majorUrl
            })
        });
        layout.newMajorRegion.show(newMajorView);

        this.listenTo(newMajorView, Search.createMajorEvt, function(view){
            var data = Backbone.Syphon.serialize(view);

            console.log(data);
            view.model.unset("urlRoot", { silent: true });
            view.model.save(data, {
                wait: true,
                success: function (model) {
                    $.jGrowl("New degree created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                    Search.addStreamAdminSection(layout);
                },

                error: function (model, response) {
                    $.jGrowl("Error saving " + model.get("title") + " degree!", {theme: 'jGrowlError'});
                    console.error("Error Model: " + model.toJSON());
                    console.error("Error Response: " + response.statusText);
                    Search.addStreamAdminSection(layout);
                }
            });
        })
    };

    Search.addMajorToStream = function(layout, stream) {
        var aMToStreamView = new Search.views.AddMajorToStream({
            model: stream
        })

        layout.addMajorToStreamRegion.show(aMToStreamView);
    };

    Search.addStreamAdminSection = function(layout, stream) {
        Search.addMajorToStream(layout, stream);
        Search.createNewDegree(layout);
        Search.createNewMajor(layout);
    };

    Search.populateAllAdminCollections = function() {
        if (!Search.allBachelorsDegreeCollection) {
            Search.allBachelorsDegreeCollection = new Application.Base.collections.Generic([], {
                url: Search.allBachelorsUrl
            });
            Search.allBachelorsDegreeCollection.fetch({async: false});
        }

        if (!Search.allMastersDegreeCollection) {
            Search.allMastersDegreeCollection = new Application.Base.collections.Generic([], {
                url: Search.allMastersUrl
            });
            Search.allMastersDegreeCollection.fetch({async: false});
        }

        if (!Search.allDoctorateDegreeCollection) {
            Search.allDoctorateDegreeCollection = new Application.Base.collections.Generic([], {
                url: Search.allDoctorateUrl
            });
            Search.allDoctorateDegreeCollection.fetch({async: false});
        }

        if (!Search.allMajorsCollection) {
            Search.allMajorsCollection = new Application.Base.collections.Generic([], {
                url: Search.allMajorsUrl
    //            comparator : function (major) {
    //                return major.get("title").toLowerCase();
    //            }
            });
            Search.allMajorsCollection.fetch({async: false});
        }
    };

    Search.forceUpdateAllAdminCollections = function() {
        if (!Search.allBachelorsDegreeCollection) {}
        Search.allBachelorsDegreeCollection = new Application.Base.collections.Generic([], {
            url: Search.allBachelorsUrl
        });
        Search.allBachelorsDegreeCollection.fetch({async: false});

        Search.allMastersDegreeCollection = new Application.Base.collections.Generic([], {
            url: Search.allMastersUrl
        });
        Search.allMastersDegreeCollection.fetch({async: false});

        Search.allDoctorateDegreeCollection = new Application.Base.collections.Generic([], {
            url: Search.allDoctorateUrl
        });
        Search.allDoctorateDegreeCollection.fetch({async: false});

        Search.allMajorsCollection = new Application.Base.collections.Generic([], {
            url: Search.allMajorsUrl
//            comparator : function (major) {
//                return major.get("title").toLowerCase();
//            }
        });
        Search.allMajorsCollection.fetch({async: false});
    };

    Search.getDegreeChecklistView = function(degreesLayout, stream, degreeSectionHeader, degreeSectionId, allDegreeCollection, valueIdArr, addOnIdArr) {
        var degreeView = new Search.views.Degree({
            model: stream,
            degreeSectionHeader: degreeSectionHeader,
            degreeSectionId: degreeSectionId,
            checklistSource: Search.getValueToTitleArrayMap(allDegreeCollection.toJSON()),
            value: valueIdArr,
            addOnIdArr: addOnIdArr
        });

        this.listenTo(degreeView, Search.updateDegreesEvt, function(updatedStream){
            Search.addDegreeSection(degreesLayout, updatedStream);
        });

        return degreeView;
    };

    Search.addDegreeSection = function(degreesLayout, stream) {
        var degreeHeadingView = new Search.views.StreamDegreeHeading({
            model: new Application.Base.models.Generic({
                heading_degree: "Degrees Offered"
            })
        });
        degreesLayout.headingDegreeRegion.show(degreeHeadingView);

        var bachelorIdArr = _.pluck(
            _.filter(stream.attributes.degrees, function(degree){
                return degree.type == Search.BACHELORS;
            }), "id");

        var mastersIdArr = _.pluck(
            _.filter(stream.attributes.degrees, function(degree){
                return degree.type == Search.MASTERS;
            }), "id");

        var doctorateIdArr = _.pluck(
            _.filter(stream.attributes.degrees, function(degree){
                return degree.type == Search.DOCTORATE;
            }), "id");

        // Show all Degrees applicable
        if (_.size(Search.allBachelorsDegreeCollection.models) > 0) {
            var bachelorsView = Search.getDegreeChecklistView(degreesLayout, stream, "Bachelors", Search.BACHELORS,
                Search.allBachelorsDegreeCollection, bachelorIdArr, mastersIdArr.concat(doctorateIdArr));
            degreesLayout.bachelorsRegion.show(bachelorsView);
        }

        if (_.size(Search.allMastersDegreeCollection.models) > 0) {
            var mastersView = Search.getDegreeChecklistView(degreesLayout, stream, "Masters", Search.MASTERS,
                Search.allMastersDegreeCollection, mastersIdArr, bachelorIdArr.concat(doctorateIdArr));
            degreesLayout.mastersRegion.show(mastersView);
        }

        if (_.size(Search.allDoctorateDegreeCollection.models) > 0) {
            var doctorateView = Search.getDegreeChecklistView(degreesLayout, stream, "Doctorate", Search.DOCTORATE,
                Search.allDoctorateDegreeCollection, doctorateIdArr, bachelorIdArr.concat(mastersIdArr));
            degreesLayout.doctorateRegion.show(doctorateView);
        }
    };

    Search.addMajorSelect = function(stream) {
        var majorSelect = new Search.views.SearchSelect({
            model: new Application.Base.models.Generic({
                selectSpanId: "majorSelect"
            }),
            selectOptionsList: Search.getIdToTitleArrayMap(stream.attributes.majors),
            emptyText: "Select Major...",
            selectEvt: Search.majorSelectEvt

        });
        Search.searchSelectNavbar.majorSelectRegion.show(majorSelect);
        this.listenTo(majorSelect, Search.majorSelectEvt, function(majorId){
            Search.showMajorPageById(majorId);
        });
        return majorSelect;
    };

    Search.showStreamPage = function(streamId) {
        Search.populateAllAdminCollections();
        var stream = new Application.Base.models.Generic({
            url: Search.streamUrl + "/" + streamId
        });
        stream.fetch({async: false});

        // AddMajorSelect
        var majorSelect = Search.addMajorSelect(stream);


        // Show stream page content
        var streamContentLayout = new Search.views.StreamContentLayout();
        Search.searchLayout.searchContent.show(streamContentLayout);

        //Major Links
//        var streamMajorsCollection = new Application.Base.collections.Generic(stream.get('majors'));
//        streamMajorsCollection = streamMajorsCollection.sortBy(function(major) {
//            return major.get("title").toLowerCase();
//        });
        var majorLinksComposite = new Search.views.SearchLinkComposite({
//            collection: streamMajorsCollection
            collection: new Application.Base.collections.Generic(stream.get('majors'))
        })
        streamContentLayout.majorsCompositeRegion.show(majorLinksComposite);
        this.listenTo(majorLinksComposite, Search.selectedLinkEvt, function(majorId){
            majorSelect.setValue(majorId);

            //TODO This should be handled in the setValue
            Search.showMajorPageById(majorId);
        });

        //Basic Info
        var basicInfoView = new Search.views.BasicInfoView({
            model: stream
        });
        streamContentLayout.basicInfoRegion.show(basicInfoView);

        //Skills
        var skillsView = new Search.views.SkillsView({
            model: stream
        });
        streamContentLayout.skillsRegion.show(skillsView);

        //Degrees
        var degreesLayout = new Search.views.StreamDegreesLayout();
        streamContentLayout.degreesRegion.show(degreesLayout);
        Search.addDegreeSection(degreesLayout, stream);

        /*
         * Admin Section to add new Degrees and Majors
         */
        if (Application.Base.isAdmin() || Application.Base.isSuperAdmin())
//            Search.populateAllAdminCollections();
            Search.addStreamAdminSection(streamContentLayout, stream);
    };


});
});