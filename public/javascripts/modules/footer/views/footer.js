define(["modules/footer/setup"],function(){
    Application.module("Footer", function(Footer, Application, Backbone, Marionette, $, _) {
        Footer.views.Footer = Marionette.ItemView.extend({
            template: "footer/views/footer"
        });
    });
});
