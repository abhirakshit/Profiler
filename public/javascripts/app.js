require.config({

    appDir: 'assets',
    baseUrl: 'assets/javascripts',
    paths: {
        //Framework
        jquery: "lib/jquery/jquery",
        jqueryUI: "lib/jquery-ui/jquery-ui",

        // Use one of the below
//        jqueryUICombobox: "lib/jquery-ui/jquery-ui-combobox/jquery.ui.combobox",
//        jqueryUIChosen: "lib/jquery-ui/jquery-ui-chosen/chosen.jquery",


        jGrowl: "lib/jquery-jgrowl/jquery.jgrowl",
        underscore: "lib/underscore/underscore",
        backbone: "lib/backbone/backbone",
        marionette: "lib/marionette/backbone.marionette",
        backboneValidation: "lib/backbone-validation/backbone-validation-amd",
        backboneSyphon: "lib/backbone-syphon/backbone.syphon",
//        backboneInlineEditable: "lib/backbone-inline_editable/backbone.inline_editable",

        //Utils
        moment: "lib/utils/moment.min",
        dateTimePicker: "lib/utils/bootstrap-datetimepicker.min",
        dataTables: "lib/jquery-dataTables/jquery.dataTables.min",
        bootstrapEditable: "lib/bootstrap-editable/bootstrap-editable",
        bootstrapWysihtml: "lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2",
        wysihtml5_0_3_0: "lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0",
        wysihtml5: "lib/bootstrap-editable/wysihtml5/wysihtml5",

        select2: "lib/select2/select2",
        bootstrap: "lib/bootstrap/bootstrap"
//        bootstrap: "lib/bootstrap3/bootstrap"

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
//        jqueryUIChosen: {
//            deps: ["jquery"]
//        },
//        jqueryUICombobox: {
//            deps: ["jquery"]
//        },
        jGrowl: {
            deps: ["jquery"]
        },

        bootstrap: {
            deps: ["jquery"]
        },


        // Inline Editing
        bootstrapEditable: {
            deps: ["bootstrap", "select2", "bootstrapWysihtml"]
        },

        wysihtml5 : { // This is with the xeditable
            deps: ["bootstrapEditable"]
        },

        wysihtml5_0_3_0 : {
            deps: ["jquery"]
        },

        bootstrapWysihtml : {
            deps: ["wysihtml5_0_3_0"]
        },

//        backboneInlineEditable: {
//            deps: ["backbone"]
//        },

        select2: {
            deps: ["jquery"]
        }
    }
});

var dependencies = [
    "marionette",
    "moment",
    "jquery",
    "jqueryUI",
//    "jqueryUICombobox",
//    "jqueryUIChosen",
    "jGrowl",
    "backboneValidation",
    "backboneSyphon",
//    "backboneInlineEditable",
    "bootstrapEditable",
    "wysihtml5", //Editable extension
    "bootstrap",
    "select2"

];

require(dependencies, function (Marionette) {
    console.log("Init Application...")
    window.Application = new Marionette.Application();
    Application.addRegions({
        headerRegion: "#header-region",
        sidebar: "#sidebar-region",
        pageContent: "#page-content-region",
        footer: "#footer-region"
    });

    require(["modules/main/loader"], function () {
        console.log("Start Application...")
        Application.start();
    });
});