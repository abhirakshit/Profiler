define(function () {
Application.module("Base",function (Base, Application, Backbone, Marionette, $, _) {
    Base.views.TableLayout = Marionette.Layout.extend({
        template: "base/views/tables/tableLayout",
        regions: {
            tableHeaderRegion: "#table-header",
            tableBodyRegion: "#table-body"
        }
    });

    var headerHtml = '<legend><%=args.header%></legend>';
    Base.views.TableHeader = Marionette.ItemView.extend({
        template: function(serialized_model) {
            var _header = serialized_model.header;
            return _.template(headerHtml, {header: _header}, {variable: 'args'});
        }
    });

    Base.rowClicked = "rowClicked";
    Base.rowClickedEvt = "RowView:rowClicked";
    Base.tableViewRowClickedEvt = "TableView:RowView:rowClicked";
//    Base.views.TableCompositeView = Marionette.CompositeView.extend({
//        tagName: "table",
////        template: "base/views/tableContainer",
////        itemView: Base.views.RowView,
//        className: "display dataTable table table-striped table-bordered",
//
//        initialize: function(attributes, options) {
//            console.log("Init Base Table");
//        }
////        appendHtml: function(compositeView, itemView, index){
////            if (this.options.viewClass) {
////                itemView.$el.addClass(this.options.viewClass);
////            }
////            this.listenTo(itemView, Base.rowClickedEvt, function(model){
////                this.trigger(Base.tableViewRowClickedEvt, model);
////            })
////            compositeView.$("tbody").append(itemView.el);
////        }
//    });
//
//    Base.views.RowView = Marionette.ItemView.extend({
////        template: "enquiry/views/row",
////        templateHelpers: Base.dateViewHelper,
//        tagName: "tr",
//        className: "rowlink",
//        serializeData: function(){
//            this.data = this.model.toJSON();
////            this.data.linkUrl = "enquiry/" + this.data.id;
//            return this.data;
//        },
//
//        initialize: function(attributes, options) {
//            console.log("Init Base Row");
//        },
//
//        events: {
//            "click td": Base.rowClicked
//        },
//
//        rowClicked: function(event){
//            event.preventDefault();
//            this.trigger(Base.rowClickedEvt, this.model);
//        }
//    });

});
});