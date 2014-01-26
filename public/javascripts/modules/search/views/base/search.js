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
            streamContentRegion: "#streamContent",
            adminRegion: "#adminSection"
        }
    })

    //ItemViews
    Search.createStreamEvt = "createStream";
    Search.views.AddNewStream = Marionette.ItemView.extend({
        template: "search/views/base/addNew",

        events: {
            "click #createStream": "createStream"
        },

        onRender: function () {
            Backbone.Validation.bind(this);
        },

        createStream: function (event) {
            event.preventDefault();
            this.trigger(Search.createStreamEvt, this);
        }
    })

    var searchContentHtml = '<p><%=args.contentText%></p>'
    Search.views.SearchContent = Marionette.ItemView.extend({
        template: function (serialized_model) {
            return _.template(searchContentHtml, {contentText: serialized_model.contentText}, {variable: 'args'})
        },

        tagName: "span"
    })

});
});