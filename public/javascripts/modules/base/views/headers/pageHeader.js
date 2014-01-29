define(["modules/base/setup"], function () {
Application.module("Base",function (Base, Application, Backbone, Marionette, $, _) {

    var headerHtml = '<div class="page-title"><%=args.header%></div>'
    Base.views.PageHeader = Marionette.ItemView.extend({
        template: function(serialized_model) {
            var _header = serialized_model.header;
            return _.template(headerHtml, {header: _header}, {variable: 'args'});
        }
    });
});
});