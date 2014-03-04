define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function(Search, Application, Backbone, Marionette, $, _) {

    var streamSelectTemplateHtml = '<span id="<%=args.selectSpanId%>"></span>';
    var defaultSelectTemplateHtml = '<i class="icon-chevron-right" style="margin-right: 3px;"></i>' + streamSelectTemplateHtml;

    Search.views.SearchSelect = Marionette.ItemView.extend({
        template: function(serialized_model) {
            if (serialized_model.isStream)
                return _.template(streamSelectTemplateHtml, {selectSpanId: serialized_model.selectSpanId}, {variable:'args'})
            else
                return _.template(defaultSelectTemplateHtml, {selectSpanId: serialized_model.selectSpanId},{variable: 'args'});
        },
        tagName: "span",
        className: "searchSelect",

        events: {
            "click #remove": "removeItem"
        },

//        initialize: function(attributes, options) {
//            if (attributes && attributes.isStream)
//                this.isStream = true;
////            console.log(attributes);
//        },

        removeItem: function() {
            this.remove();
            this.trigger('removed', this.model);
        },

//        editableTag: null,
        onRender: function() {
            this.editableTag = this.$el.find('#' + this.model.attributes.selectSpanId);
            var that = this;
            this.editableTag.editable({
                source: that.options.selectOptionsList,
//                value: initialValue,
                emptytext: that.options.emptyText,
                type: "select2",
                select2: {
                    placeholder: that.options.emptyText,
                    allowClear: true
                },
                success: function(response, id) {
                    that.trigger(that.options.selectEvt, id);
                }
            });
            this.editableTag.editable('option', 'disabled', false);
        },

        setValue: function(id) {
            this.editableTag.editable("setValue", id);
            //TODO Why is this not working?
//            this.editableTag.editable.success(null, id);
        }

    });

    Search.views.SearchSelectNavBar = Marionette.Layout.extend({
        template: "search/views/navigation/navigation",
        regions: {
            streamSelectRegion: "#streamSelect",
            majorSelectRegion: "#majorSelect",
            specializationSelectRegion: "#specializationSelect"
        }
    })


});
});