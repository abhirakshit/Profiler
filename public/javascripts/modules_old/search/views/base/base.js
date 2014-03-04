define(
    ["modules/search/setup"],
    function(){
Application.module("Search", function (Search, Application, Backbone, Marionette, $, _) {

    Search.setupWYSIWIGEditor = function(view, viewId, value, emptyText, modelAttr){
        view.$el.find("#" + viewId).editable({
            type: "wysihtml5",
            emptytext: emptyText,
            value: value,
            success: function (response, value) {
                view.model.save(modelAttr, value, {
                    wait: true,
                    patch: true,
                    success: function (newModel) {
                        console.log("Saved on server!!")
                        console.dir(newModel)
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

    //ItemViews
    Search.views.BasicInfoView = Marionette.ItemView.extend({
        template: "search/views/base/basicInfo",


        onRender: function () {
            var fieldId = "basicInfoEditor";
            var modelId = "basicInfo";
            Search.setupWYSIWIGEditor(this, fieldId, this.model.toJSON().basicInfo, "Add info...", modelId);
        }

    });

//    var genericWYSIWYGHtml = "<h4 id='<%=args.headingId%>'><%=args.headingTitle%></h4>" +
    var genericWYSIWYGHtml = "<div class='sectionHeader' id='<%=args.headingId%>'><%=args.headingTitle%><hr></div>" +
        "<div id='<%=args.editorId%>'></div>"
    Search.views.GenericWYSIWYGView = Marionette.ItemView.extend({
        className: 'wysihtml5',
        template: function(serialized_model){
            return _.template(genericWYSIWYGHtml, {
                headingId: serialized_model.headingId,
                headingTitle: serialized_model.headingTitle,
                editorId: serialized_model.editorId
            }, {variable: 'args'})
        },

        serializeData : function() {
            var data = this.model.toJSON();
            data.headingId = this.options.headingId;
            data.headingTitle = this.options.headingTitle;
            data.editorId = this.options.editorId;
            return data;
        },

        onRender: function () {
            var modelJson = this.model.toJSON();
            Search.setupWYSIWIGEditor(this, this.options.editorId, this.options.value, this.options.emptyText, this.options.modelAttr);
        }

    });
});
});