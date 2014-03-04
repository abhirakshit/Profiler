define(
    ["modules/queries/setup"],
    function(){
Application.module("Queries", function (Queries, Application, Backbone, Marionette, $, _) {

    Queries.createNewQueryEvt = "createNewQuery";

    Queries.views.StudentQueriesLayout = Marionette.Layout.extend({
        template: "queries/views/student/layout",

        regions: {
            newQueryRegion: "#newQuery",
            queryTableRegion: "#queryTable"
        }
    });

    Queries.views.addNewQuery = Marionette.ItemView.extend({
        template: "queries/views/student/addQuery",

        events: {
            "click #createNewQueryBtn": Queries.createNewQueryEvt,
            "click #cancelNewQueryBtn": "cancelNewQuery",
            "click #addQueryBtnContainer": "toggleCreateQueryEditor"
        },

//        serializeData: function(){
//            this.data = this.model.toJSON();
//            return this.data;
//        },

        createNewQuery: function (event) {
            event.preventDefault();
            //TODO Check for save clicked on empty box
            this.trigger(Queries.createNewQueryEvt, this);
            this.toggleCreateQueryEditor(event);
        },

        cancelNewQuery: function (event) {
            event.preventDefault();
            this.toggleCreateQueryEditor(event);
        },

        toggleCreateQueryEditor: function(event) {
            event.preventDefault();
            this.addQueryEditorContainer.fadeToggle();
        },

        onRender: function () {
            //Setup editor
            this.addQueryEditor = this.$el.find("#addQueryEditor");
            this.addQueryEditorContainer = this.$el.find("#addQueryEditorContainer");
            this.addQueryEditor.wysihtml5();

            // Add button
            var addEnquiryBtn = new Application.Base.views.AddButton({
                model: new Backbone.Model({
                    linkUrl: "query/add",
                    linkClasses: "btn btn-primary",
                    iconClasses: "icon-plus-sign icon-white",
                    btnText: "Add Query",
                    id: "addQueryBtn"
                })
            });

            this.$el.find("#addQueryBtnContainer").append(addEnquiryBtn.render().el);
        }
    });

    Queries.views.MyQueriesTableRow = Marionette.ItemView.extend({
        template: "queries/views/student/row",
        templateHelpers: Application.Base.dateViewHelper,
        tagName: "tr",
        className: "rowlink",
        serializeData: function(){
            this.data = this.model.toJSON();
            this.data.linkUrl = "query/" + this.data.id;
            this.data.assigneeNames = Application.Base.getCounselorName(this.data.assignedTo);
            return this.data;
        },

        events: {
            "click td": Application.Base.rowClicked
        },

        rowClicked: function(event){
            event.preventDefault();
            this.trigger(Application.Base.rowClickedEvt, this.model);
        }
    });

    Queries.views.MyQueriesTable = Marionette.CompositeView.extend({
        tagName: "table",
        template: "queries/views/student/tableContainer",
        itemView: Queries.views.MyQueriesTableRow,
        className: "display dataTable table table-striped table-bordered",

        appendHtml: function(compositeView, itemView, index){
//            if (this.options.viewClass) {
//                itemView.$el.addClass(this.options.viewClass);
//            }
//            this.listenTo(itemView, Application.Base.rowClickedEvt, function(model){
//                this.trigger(Application.Base.tableViewRowClickedEvt, model);
//            })
//            console.log("On appendHtml Query Table " + this.itemView);
            compositeView.$("tbody").append(itemView.el);
        }
    });



});
});