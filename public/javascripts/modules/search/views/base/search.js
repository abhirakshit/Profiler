define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function (Search, Application, Backbone, Marionette, $, _) {

    /**
     * Main Search Page
     *
     */

        //Layouts
    Search.views.SearchContentLayout = Marionette.Layout.extend({
        template: "search/views/base/searchLayout",

        regions: {
            streamLinksRegion: "#streamlinks",
            streamContentRegion: "#streamContent",
            adminRegion: "#adminSection"
        }
    });

    //ItemViews
    Search.createStreamEvt = "createStream";
    Search.selectedLinkEvt = "selectedLink";


    var searchLinkHtml = '<a><%=args.linkText%></a>';
    Search.views.SearchLink = Marionette.ItemView.extend({
        template: function (serialized_model) {
            return _.template(searchLinkHtml, {linkText: serialized_model.title}, {variable: 'args'})
        },

        tagName: "li",
//        className: "label label-info streamLink",

        events: {
            "click": "clicked"
        },

        clicked: function(evt) {
            evt.preventDefault();
            this.trigger(Search.selectedLinkEvt, this);
        }

    });

    Search.views.SearchLinkComposite = Marionette.CompositeView.extend({
        template: "search/views/base/section",
//        template: function () {
//            return _.template('')
//        },
        itemView: Search.views.SearchLink,
        className: "streamLinkComposite",
        itemViewContainer: "ul",

        initialize: function(){
            var that = this;
            this.on("itemview:" + Search.selectedLinkEvt, function(childView){
//                console.log("Show Module: " + childView.model.get("title"));
                that.trigger(Search.selectedLinkEvt, childView.model.get('id'));
            });
        }
    });


    var streamLinkHtml = '<%=args.linkText%>';
    Search.views.StreamLink = Marionette.ItemView.extend({
        template: function (serialized_model) {
            return _.template(streamLinkHtml, {linkText: serialized_model.title}, {variable: 'args'})
        },

        tagName: "span",
//        className: "label label-info streamLink",
        className: "span3 streamLink",

        events: {
            "click": "clicked"
        },

        clicked: function(evt) {
            evt.preventDefault();
            this.trigger(Search.selectedLinkEvt, this);
        }

    });

    Search.views.StreamLinkComposite = Marionette.CompositeView.extend({
//        template: "search/views/base/section",
        template: function () {
            return _.template('')
        },
        itemView: Search.views.StreamLink,
        className: "row-fluid streamLinkComposite",
//        className: "row-fluid",
//        itemViewContainer: "ul",

        initialize: function(){
            var that = this;
            this.on("itemview:" + Search.selectedLinkEvt, function(childView){
//                console.log("Show Module: " + childView.model.get("title"));
                that.trigger(Search.selectedLinkEvt, childView.model.get('id'));
            });
        }
    });

    Search.views.AddNewStream = Marionette.ItemView.extend({
        template: "search/views/base/addNew",

        events: {
            "click #createStream": Search.createStreamEvt
        },

        onRender: function () {
            Backbone.Validation.bind(this);
        },

        createStream: function (event) {
            event.preventDefault();
            this.trigger(Search.createStreamEvt, this);
        }
    });

    Search.views.SearchContent = Marionette.ItemView.extend({
        template: "search/views/base/landingPage",
        tagName: "span"
    })

});
});