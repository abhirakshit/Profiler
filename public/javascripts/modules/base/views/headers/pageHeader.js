define(function () {
Application.module("Base",function (Base, Application, Backbone, Marionette, $, _) {

    var headerHtml = '<h1 class="page-title"><%=args.header%></h1>'
    Base.views.PageHeader = Marionette.ItemView.extend({
        template: function(serialized_model) {
            var _header = serialized_model.header;
            return _.template(headerHtml, {header: _header}, {variable: 'args'});
        }
    });
});
});