Tracker.module("Base",function (Base, Tracker, Backbone, Marionette, $, _) {

    var headerHtml = '<h1 class="page-title"><%=args.header%></h1>'
    Base.PageHeader = Marionette.ItemView.extend({
        template: function(serialized_model) {
            var _header = serialized_model.header;
            return _.template(headerHtml, {header: _header}, {variable: 'args'});
        }
    });
});