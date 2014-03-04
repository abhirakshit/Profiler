define([
    "modules/career/career_setup"
], function(){
    Application.module("Career", function(Career, Application, Backbone, Marionette, $, _) {
        Career.views.Layout = Application.Views.Layout.extend({
            template: "career/career_layout",

            regions: {
//                pageHeaderRegion: "#page-header",
                navigationTabsRegion: "#nav-tabs",
                tabContentRegion: "#tab-content"
            }
        });

        Career.views.BasicInfoView = Application.Views.ItemView.extend({
            template: "career/templates/basicInfo",


            onRender: function () {
                var fieldId = "basicInfoEditor";
                var modelId = "basicInfo";
                Career.setupWYSIWIGEditor(this, fieldId, this.model.get('basicInfo'), "Add info...", modelId);
            }

        });

        var genericWYSIWYGHtml = "<div class='sectionHeader' id='<%=args.headingId%>'><%=args.headingTitle%><hr></div>" +
            "<div id='<%=args.editorId%>'></div>"
        Career.views.GenericWYSIWYGView = Application.Views.ItemView.extend({
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
                Career.setupWYSIWIGEditor(this, this.options.editorId, this.options.value, this.options.emptyText, this.options.modelAttr);
            }

        });

        Career.setupWYSIWIGEditor = function(view, viewId, value, emptyText, modelAttr){
            view.$el.find("#" + viewId).editable({
                type: "wysihtml5",
                emptytext: emptyText,
                value: value,
                disabled: !Application.USER_IS_ADMIN,
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

    });
});