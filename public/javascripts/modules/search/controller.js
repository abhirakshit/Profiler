define(
    [   "modules/search/views/base/base",
        "modules/search/views/base/search",
        "modules/search/views/specialization/specialization",
        "modules/search/views/stream/stream",
        "modules/search/views/major/major",
        "modules/search/views/navigation/navigation",
        "modules/search/views/layouts/layout"],
    function(){
Application.module("Search", function(Search, Application, Backbone, Marionette, $, _) {

    Search.onTemplatesLoaded = function() {
        this.show();
    };

    Search.show = function() {
        console.log("Show Search...");
        Search.controller = new Search.Controller({
            region: Application.pageContent
        });

        Search.router = new Search.Router({
            controller: Search.controller
        });

        Search.controller.showSearchHome();
    };

    Search.homeUrl = "search";

//    Search.createStreamEvt = "createStream";

    Search.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "search": "showSearchHome"
        }
    });

    Search.getIdToTitleArrayMap = function(collectionJson) {
        return _.map(collectionJson, function(model){
            return {id: model.id, text: model.title}
        });
    }

    Search.getValueToTitleArrayMap = function(collectionJson) {
        return _.map(collectionJson, function(model){
            return {value: model.id, text: model.title}
        });
    }


    Search.populateAllStreams = function() {
        Search.allStreamsCollection = new Search.collections.AllStreamsCollection();
        Search.allStreamsCollection.fetch({async:false});
    };

    Search.Controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
            console.log('Search Module Initialized');
            Search.populateAllStreams();
        },

        showSearchHome: function() {
            Search.mainLayout = new Application.Base.views.MainLayout();
            this.region.show(Search.mainLayout);

//            //Get Stream Data

            //Add views
            Search.addPageHeader();
            Search.showSearchSection();
            Search.router.navigate(Search.homeUrl);
        }

    });

    Search.streamSelectEvt = "streamSelected";
    Search.majorSelectEvt = "majorSelected";
    Search.specializationSelectEvt = "specializationSelected";

    Search.addPageHeader = function() {
        var headerLayoutView = new Application.Base.views.HeaderLayout();
        Search.mainLayout.pageHeaderRegion.show(headerLayoutView);

        //Show header
        var pgHeader = new Application.Base.views.PageHeader({
            model: new Backbone.Model({header: "Search"})
        });
        headerLayoutView.pageHeader.show(pgHeader);
    };

    Search.showSearchSection = function() {
        Search.searchLayout = new Search.views.mainLayout();
        Search.mainLayout.tabContentRegion.show(Search.searchLayout);

        // Search Naviagtion
        Search.searchSelectNavbar = new Search.views.SearchSelectNavBar();
        Search.searchLayout.searchNavigation.show(Search.searchSelectNavbar);
        Search.addStreamSelect();
    };

    Search.addStreamSelect = function() {
        var streamSelect = new Search.views.SearchSelect({
            model: new Application.Base.models.Generic({
                selectSpanId: "streamSelect",
                isStream: true
            }),
            selectOptionsList: Search.getIdToTitleArrayMap(Search.allStreamsCollection.toJSON()),
            emptyText: "Select Stream...",
            selectEvt: Search.streamSelectEvt
        });

        Search.searchSelectNavbar.streamSelectRegion.show(streamSelect);
        this.listenTo(streamSelect, Search.streamSelectEvt, function(streamId){
            Search.showStreamPage(streamId);
        });

        //Search Content
        var streamContentLayout = new Search.views.SearchContentLayout();
        Search.searchLayout.searchContent.show(streamContentLayout);

        var streamContent = new Search.views.SearchContent({
            model: new Application.Base.models.Generic({
                contentText: "Start your search above"
            })
        });
        streamContentLayout.streamContentRegion.show(streamContent);

        // Admin Section -- add new Stream
        if (Application.Base.isAdmin())
            streamContentLayout.addNewStreamRegion.show(Search.getCreateStreamView());
    };

    Search.getCreateStreamView = function(){
        var newStreamView = new Search.views.AddNewStream({
            model: new Search.models.Stream()
        });

        this.listenTo(newStreamView, Search.createStreamEvt, function(view){
            var data = Backbone.Syphon.serialize(view);

            view.model.save(data, {
                wait: true,
                success: function (model) {
                    $.jGrowl("New stream created: " + model.get("title"), {theme: 'jGrowlSuccess'});
                    //Refresh Stream List
                    Search.populateAllStreams();
                    //Reload page content
                    Search.showSearchSection();
                },

                error: function (model, response) {
                    $.jGrowl("Error saving " + model.get("title") + " stream!", {theme: 'jGrowlError'});
                    console.error("Error Model: " + model);
                    console.error("Error Response: " + response.responseText);
                    Search.showSearchSection();
                }
            });
        });
        return newStreamView;
    };

//    Search.populateAllCollections = function() {
//        Search.allBachelorsDegreeCollection = new Application.Base.collections.Generic([], {
//            url: Search.allBachelorsUrl
//        });
//        Search.allBachelorsDegreeCollection.fetch({async: false});
//
//        Search.allMastersDegreeCollection = new Application.Base.collections.Generic([], {
//            url: Search.allMastersUrl
//        });
//        Search.allMastersDegreeCollection.fetch({async: false});
//
//        Search.allDoctorateDegreeCollection = new Application.Base.collections.Generic([], {
//            url: Search.allDoctorateUrl
//        });
//        Search.allDoctorateDegreeCollection.fetch({async: false});
//
//        Search.allMajorsCollection = new Application.Base.collections.Generic([], {
//            url: Search.allMajorsUrl
//        });
//        Search.allMajorsCollection.fetch({async: false});
//
//    };

    Search.BACHELORS = "bachelors";
    Search.MASTERS = "masters";
    Search.DOCTORATE = "doctorate";
    Search.DEGREES = "degrees";

//    Search.showStreamPage = function(streamId) {
//        Search.populateAllCollections();
////        var stream = _.findWhere(Search.allStreamsCollection.models, {id: parseInt(streamId, 10)});
//        var stream = new Application.Base.models.Generic({
//           url: "/stream/" + streamId
//        });
//        stream.fetch({async: false});
//
////        var streamDegreesCollection = new Application.Base.collections.Generic({
////            collection: stream.attributes.degrees
////        });
//
//        // AddMajorSelect
//        Search.addMajorSelect(stream);
//
//
//        // Show stream page content
//        var majorContentLayout = new Search.views.StreamContentLayout();
//        Search.searchLayout.searchContent.show(majorContentLayout);
//
//        //Basic Info
//        var basicInfoView = new Search.views.BasicInfoView({
//            model: stream
//        });
//        majorContentLayout.basicInfoRegion.show(basicInfoView);
//
//        //Skills
//        var skillsView = new Search.views.SkillsView({
//            model: stream
//        });
//        majorContentLayout.skillsRegion.show(skillsView);
//
//        //Degrees
//        var degreesLayout = new Search.views.StreamDegreesLayout();
//        majorContentLayout.degreesRegion.show(degreesLayout);
//        Search.addDegreeSection(degreesLayout, stream);
//
//        /*
//         * Admin Section to add new Degrees and Majors
//         */
//        Search.addStreamAdminSection(majorContentLayout);
//    };


//    Search.addDegreeSection = function(degreesLayout, stream) {
//        var degreeHeadingView = new Search.views.StreamDegreeHeading({
//            model: new Application.Base.models.Generic({
//                heading_degree: "Degrees Offered"
//            })
//        });
//        degreesLayout.headingDegreeRegion.show(degreeHeadingView);
//
//        var bachelorIdArr = _.pluck(
//            _.filter(stream.attributes.degrees, function(degree){
//                return degree.type == Search.BACHELORS;
//            }), "id");
//
//        var mastersIdArr = _.pluck(
//            _.filter(stream.attributes.degrees, function(degree){
//                return degree.type == Search.MASTERS;
//            }), "id");
//
//        var doctorateIdArr = _.pluck(
//            _.filter(stream.attributes.degrees, function(degree){
//                return degree.type == Search.DOCTORATE;
//            }), "id");
//
//        // Show all Degrees applicable
//        if (_.size(Search.allBachelorsDegreeCollection.models) > 0) {
//            var bachelorsView = Search.getDegreeChecklistView(degreesLayout, stream, "Bachelors", Search.BACHELORS,
//                Search.allBachelorsDegreeCollection, bachelorIdArr, mastersIdArr.concat(doctorateIdArr));
//            degreesLayout.bachelorsRegion.show(bachelorsView);
//        }
//
//        if (_.size(Search.allMastersDegreeCollection.models) > 0) {
//            var mastersView = Search.getDegreeChecklistView(degreesLayout, stream, "Masters", Search.MASTERS,
//                Search.allMastersDegreeCollection, mastersIdArr, bachelorIdArr.concat(doctorateIdArr));
//            degreesLayout.mastersRegion.show(mastersView);
//        }
//
//        if (_.size(Search.allDoctorateDegreeCollection.models) > 0) {
//            var doctorateView = Search.getDegreeChecklistView(degreesLayout, stream, "Doctorate", Search.DOCTORATE,
//                Search.allDoctorateDegreeCollection, doctorateIdArr, bachelorIdArr.concat(mastersIdArr));
//            degreesLayout.doctorateRegion.show(doctorateView);
//        }
//    };

//    Search.getDegreeChecklistView = function(degreesLayout, stream, degreeSectionHeader, degreeSectionId, allDegreeCollection, valueIdArr, addOnIdArr) {
//        var degreeView = new Search.views.Degree({
//            model: stream,
//            degreeSectionHeader: degreeSectionHeader,
//            degreeSectionId: degreeSectionId,
//            checklistSource: Search.getValueToTitleArrayMap(allDegreeCollection.toJSON()),
//            value: valueIdArr,
//            addOnIdArr: addOnIdArr
//        });
//
//        this.listenTo(degreeView, Search.updateDegreesEvt, function(updatedStream){
//           Search.addDegreeSection(degreesLayout, updatedStream);
//        });
//
//        return degreeView;
//    };

//    Search.addMajorSelect = function(stream) {
//        var majorSelect = new Search.views.SearchSelect({
//            model: new Application.Base.models.Generic({
//                selectSpanId: "majorSelect"
//            }),
//            selectOptionsList: Search.getIdToTitleArrayMap(stream.attributes.majors),
//            emptyText: "Select Major...",
//            selectEvt: Search.majorSelectEvt
//
//        });
//        Search.searchSelectNavbar.majorSelectRegion.show(majorSelect);
//        this.listenTo(majorSelect, Search.streamSelectEvt, function(majorId){
//            console.log(majorId);
//            Search.showMajorPage(majorId);
//        });
//    };

});
});