Application.module("Footer", function(Footer, Application, Backbone, Marionette, $, _) {

    Footer.views.FooterView = Marionette.ItemView.extend({
        template: "footer/footer"
    });

});