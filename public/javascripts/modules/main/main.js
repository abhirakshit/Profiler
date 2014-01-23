define(["marionette", "modules/main/loader"], function (Marionette) {
    console.log("Init Application...")
    window.Application = new Marionette.Application();
    Application.on("initialize:after", function () {
        console.log("Contact Manager has started");
    });
    Application.addRegions({
        headerRegion: "#header-region",
        sidebar: "#sidebar-region",
        pageContent: "#page-content-region",
        footer: "#footer-region"
    });
    return Application;
});