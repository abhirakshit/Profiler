define([
    "modules/career/home/home_setup"
], function(){
    Application.module("Career.Home", function(Home, Application, Backbone, Marionette, $, _) {
        Home.views.Layout = Application.Views.Layout.extend({
            template: "career/home/templates/home_layout",

            regions: {
                streamLinksRegion: "#streamlinks",
                streamContentRegion: "#streamContent",
                adminRegion: "#adminSection"
            }
        });

        var streamLinkHtml = '<%=args.linkText%>';
        Home.views.StreamLink = Application.Views.ItemView.extend({
            template: function (serialized_model) {
                return _.template(streamLinkHtml, {linkText: serialized_model.title}, {variable: 'args'})
            },

            tagName: "span",

            initialize: function(options) {
                this.$el.prop("class", "span3 streamlink " + options.colorClass);
            },

            events: {
                "click": "clicked"
            },

            clicked: function(evt) {
                evt.preventDefault();
                this.trigger(Application.STREAM_LINK_SELECT, this);
//                Application.commands.execute(Application.STREAM_SHOW, this.model.get('id'));
            }

        });

        var colorArr = [
            "biology",
            "commerce",
            "engineering",
            "arts"
        ];

        Home.views.StreamLinkComposite = Application.Views.CompositeView.extend({
            template: function () {
                return _.template('')
            },
            itemView: Home.views.StreamLink,
            className: "row-fluid streamLinkComposite",

            itemViewOptions: function (model, index) {
                return { colorClass: colorArr[index] };
            },

            initialize: function(){
                var that = this;
                this.on(Application.CHILD_VIEW + ":" + Application.STREAM_LINK_SELECT, function(childView){
                    that.trigger(Application.STREAM_LINK_SELECT, childView.model.get('id'));
                });
            }
        });

        Home.views.PageContent = Application.Views.ItemView.extend({
            template: "career/home/templates/landing_page",
            tagName: "span"
        });

        Home.views.AddNewStream = Application.Views.ItemView.extend({
            template: "career/home/templates/add_stream",

            events: {
                "click #createStream": "createStream"
            },

            onRender: function () {
                Backbone.Validation.bind(this);
            },

            createStream: function (event) {
                event.preventDefault();
                this.trigger(Application.STREAM_CREATE, this);
            }
        });

    });
});