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

    var Base = Application.Base;
    Search.BACHELORS = "bachelors";
    Search.MASTERS = "masters";
    Search.DOCTORATE = "doctorate";
    Search.DEGREES = "degrees";

    Search.homeNav = "search";

    Search.onTemplatesLoaded = function() {
        Search.start();
    };

    Search.start = function() {
        console.log("Start Search Module...");
//        Search.controller = new Search.Controller({
//            region: Application.pageContent
//        });

        Search.router = new Search.Router({
            controller: new Search.Controller({
                region: Application.pageContent
            })
        });

//        Search.controller.showSearchHome();
        Search.router.navigate(Search.homeNav);
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

    Search.initAllCollections = function() {
        Search.allStreamsCollection = new Search.collections.AllStreamsCollection();
//        Search.allStreamsCollection.fetch({async:false});
    };

    Search.getStream  = function(streamId) {
        return _.find(Search.allStreamsCollection.models, function(model) {
            return model.get('id') == streamId;
        })
    };

//    Search.Controller = Marionette.Controller.extend({
    Search.Controller = Base.Controller.extend({

//        initialize: function(options) {
//            this.region = options.region;
//            this.startMod(options);
//        },

        startMod: function() {
            console.log("Show Search...");
            Search.initAllCollections();
            Search.mainLayout = new Application.Base.views.PageLayout();
            this.show(Search.mainLayout,
                {
                    loading: {entities: {collection: Search.allStreamsCollection}},
                    call: this.showPage
                });
//            this.show(Search.mainLayout, {});
            Search.searchLayout = new Search.views.Layout();
            Search.mainLayout.tabContentRegion.show(Search.searchLayout);

            // Search Navigation
            Search.searchSelectNavbar = new Search.views.SearchSelectNavBar();
            Search.searchLayout.searchNavigation.show(Search.searchSelectNavbar);
            this.showSearchHome();
        },

        showPage: function() {
            console.log("***In show page!!!")
            Search.searchLayout = new Search.views.Layout();
            Search.mainLayout.tabContentRegion.show(Search.searchLayout);

            // Search Navigation
            Search.searchSelectNavbar = new Search.views.SearchSelectNavBar();
            Search.searchLayout.searchNavigation.show(Search.searchSelectNavbar);
            this.showSearchHome()
        },

        showSearchHome: function() {
            //Add views
            Search.addPageHeader();
            console.log("***Collection fetched!!!")
            Search.allStreamsCollection.fetch({async:false});
//            Search.setupLayout();
            Search.addStreamSelect();
            Search.addSearchContent();
        },

        showStreamPage: function(streamId) {
//            Search.setupLayout();
            this.setupLayout();
            Search.addPageHeader();
            Search.addStreamSelect();
            Search.setStreamValue(streamId);
            Search.showStreamPage(streamId);
        },

        showMajorPage: function(streamId, majorId) {
            this.showStreamPage(streamId);
            Search.setMajorAndShowMajorPage(majorId);
        },

        setupLayout: function() {
            Search.mainLayout = new Application.Base.views.PageLayout();
            this.region.show(Search.mainLayout);
            Search.searchLayout = new Search.views.Layout();
            Search.mainLayout.tabContentRegion.show(Search.searchLayout);

            // Search Navigation
            Search.searchSelectNavbar = new Search.views.SearchSelectNavBar();
            Search.searchLayout.searchNavigation.show(Search.searchSelectNavbar);
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

//    Search.setupLayout = function() {
//        Search.mainLayout = new Application.Base.views.PageLayout();
//        Search.controller.region.show(Search.mainLayout);
//
//        Search.searchLayout = new Search.views.PageLayout({
//            collection: Search.allStreamsCollection
//        });
//        Search.mainLayout.tabContentRegion.show(Search.searchLayout);
//        Search.allStreamsCollection.fetch({async:false});
//
//
//        // Search Navigation
//        Search.searchSelectNavbar = new Search.views.SearchSelectNavBar();
//        Search.searchLayout.searchNavigation.show(Search.searchSelectNavbar);
//    };


    Search.setStreamValue = function(streamId) {
        Search.streamSelect.setValue(streamId);
    };

    Search.addSearchContent = function() {
//        Search.router.navigate(Search.homeNav);
        //Search Content
        var searchContentLayout = new Search.views.SearchContentLayout();
        Search.searchLayout.searchContent.show(searchContentLayout);
        var searchLinkComposite = new Search.views.StreamLinkComposite({
            collection: Search.allStreamsCollection,
            model: new Application.Base.models.Generic({
                headingText: "Streams",
                contentId: "streams"
            })
        });

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

//        Search.allStreamsCollection.fetch({async:false});
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
                    Search.initAllCollections();
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