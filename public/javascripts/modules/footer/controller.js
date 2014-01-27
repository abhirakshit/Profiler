define(
    ["modules/footer/views/footer"],
    function () {
    Application.module("Footer", function(Footer, Application, Backbone, Marionette, $, _) {
        Footer.show = function(){
            console.log("Show Footer");
            Application.footerRegion.show(new Footer.views.Footer());
        };
    });
});