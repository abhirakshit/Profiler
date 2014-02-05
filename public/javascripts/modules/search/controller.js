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

    Search.BACHELORS = "bachelors";
    Search.MASTERS = "masters";
    Search.DOCTORATE = "doctorate";
    Search.DEGREES = "degrees";

    Search.homeNav = "search";

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


    Search.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "search": "showSearchHome",
            "search/:id": "showStreamPage",
            "search/:searchId/:majorId": "showMajorPage"
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
            //Add views
            Search.setupLayout();
            Search.addPageHeader();
            Search.addStreamSelect();
            Search.addSearchContent();
//            Search.showSearchSection();
//            Search.router.navigate(Search.homeNav);
        },

        showStreamPage: function(streamId) {
//            Search.showStreamPage(streamId);
            Search.setupLayout();
            Search.addPageHeader();
            Search.addStreamSelect();
            Search.setStreamValue(streamId);
            Search.showStreamPage(streamId);
//            Search.setStreamAndShowStreamPage(streamId);
        },

        showMajorPage: function(streamId, majorId) {
//            Search.setupLayout();
//            Search.addPageHeader();
//            Search.addStreamSelect();
//            Search.setStreamValue(streamId);
//            Search.showStreamPage(streamId);
            this.showStreamPage(streamId);
            Search.setMajorAndShowMajorPage(majorId);
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
//            model: new Backbone.Model({header: "Search"})
            model: new Backbone.Model({header: "CareerDB"})
        });
        headerLayoutView.pageHeader.show(pgHeader);
    };

    Search.setupLayout = function() {
        Search.mainLayout = new Application.Base.views.MainLayout();
        Search.controller.region.show(Search.mainLayout);

        Search.searchLayout = new Search.views.MainLayout();
        Search.mainLayout.tabContentRegion.show(Search.searchLayout);

        // Search Navigation
        Search.searchSelectNavbar = new Search.views.SearchSelectNavBar();
        Search.searchLayout.searchNavigation.show(Search.searchSelectNavbar);
    };

//    Search.showSearchSection = function() {
//        Search.setupLayout();
//        Search.addStreamSelect();
//        Search.addSearchContent();
//    };

    Search.setStreamValue = function(streamId) {
        Search.streamSelect.setValue(streamId);
    };

//    Search.setStreamAndShowStreamPage = function(streamId) {
//        Search.streamSelect.setValue(streamId);
//
//        //TODO This should be handled in the setValue
//        Search.showStreamPage(streamId);
//    }

    Search.addSearchContent = function() {
        Search.router.navigate(Search.homeNav);
        //Search Content
        var searchContentLayout = new Search.views.SearchContentLayout();
        Search.searchLayout.searchContent.show(searchContentLayout);


        var searchLinkComposite = new Search.views.StreamLinkComposite({
            collection: Search.allStreamsCollection,
            model: new Application.Base.models.Generic({
                headingText: "Streams",
                contentId: "streams"
            })
        })
        searchContentLayout.streamLinksRegion.show(searchLinkComposite);
        this.listenTo(searchLinkComposite, Search.selectedLinkEvt, function(streamId){
            Search.setStreamValue(streamId);
//            //TODO This should be handled in the setValue
            Search.showStreamPage(streamId);
        });

        var searchContent = new Search.views.SearchContent({
            model: new Application.Base.models.Generic({
                contentText: "Start your search above"
            })
        });
        searchContentLayout.streamContentRegion.show(searchContent);

        // Admin Section -- add new Stream
        if (Application.Base.isAdmin())
            searchContentLayout.adminRegion.show(Search.getCreateStreamView());
    };

    Search.addStreamSelect = function() {
        Search.streamSelect = new Search.views.SearchSelect({
            model: new Application.Base.models.Generic({
                selectSpanId: "streamSelect",
                isStream: true
            }),
            selectOptionsList: Search.getIdToTitleArrayMap(Search.allStreamsCollection.toJSON()),
            emptyText: "Select Stream...",
            selectEvt: Search.streamSelectEvt
        });

        Search.searchSelectNavbar.streamSelectRegion.show(Search.streamSelect);
        this.listenTo(Search.streamSelect, Search.streamSelectEvt, function(streamId){
            Search.showStreamPage(streamId);
        });
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



});
});