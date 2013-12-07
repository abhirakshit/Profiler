require.config({

    baseUrl: 'assets/javascripts',
    paths: {
        //Framework
        jquery: "lib/jquery/jquery",
        jqueryUI: "lib/jquery-ui/jquery-ui",
        jGrowl: "lib/jquery-jgrowl/jquery.jgrowl",
        underscore: "lib/underscore/underscore",
        backbone: "lib/backbone/backbone",
        marionette: "lib/marionette/backbone.marionette",
        backboneValidation: "lib/backbone-validation/backbone-validation-amd",
        backboneSyphon: "lib/backbone-syphon/backbone.syphon",

        //Utils
        moment: "lib/utils/moment.min",
        dateTimePicker: "lib/utils/bootstrap-datetimepicker.min",
        dataTables: "lib/jquery-dataTables/jquery.dataTables.min",
        bootstrap: "lib/bootstrap/bootstrap",

    },

    shim: {
        underscore: {
            exports: "_"
        },

        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },

        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },

        templateLoader: {
            deps: ["marionette"]
        },

        dataTables: {
            deps: ["jquery"]
        },

        jGrowl: {
            deps: ["jquery"]
        },

        bootstrap: {
            deps: ["jquery"]
        }
    }
});

var dependencies = [
    "marionette",
    "moment",
    "jquery",
    "jqueryUI",
    "jGrowl",
    "backboneValidation",
    "backboneSyphon",
    "bootstrap"

];

require(dependencies, function (Marionette) {
    console.log("Init Application...")
    window.Tracker = new Marionette.Application();
    Tracker.addRegions({
        headerRegion: "#header-region",
        sidebar: "#sidebar-region",
        pageContent: "#page-content-region",
        footer: "#footer-region"
    });

    require(["modules/main/loader"], function () {
        console.log("Start Application...")
        Tracker.start();
    });
});