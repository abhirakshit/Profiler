Application.module("Header", function(Header, Application, Backbone, Marionette, $, _) {

    //Layouts
    Header.views.Layout = Marionette.Layout.extend({
        template: "header/views/layouts/layout",
        className: "navbar-inner",

        regions: {
            appLabel: "#app-label",
            navTabs: "#header-nav-tabs",
            userDropDown: "#user-dropdown"
        }
    });

});