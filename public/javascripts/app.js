requirejs.config({

    /**
     * Local Setup
     */
//    baseUrl: 'assets/javascripts',

    paths: {
        //Build
        jquery: "lib/jquery/jquery.min",
        jqueryUI: "lib/jquery-ui/jquery-ui.min",
        jGrowl: "lib/jquery-jgrowl/jquery.jgrowl.min",
        underscore: "lib/underscore/underscore-min",
        backbone: "lib/backbone/backbone-min",
        marionette: "lib/marionette/backbone.marionette.min",
        marionetteLoading: "lib/marionette-loading/marionette.loading",
        backboneValidation: "lib/backbone-validation/backbone-validation-amd-min",
        backboneSyphon: "lib/backbone-syphon/backbone.syphon.min",

        //Utils
        moment: "lib/utils/moment.min",
        dateTimePicker: "lib/utils/bootstrap-datetimepicker.min",
        dataTables: "lib/jquery-dataTables/jquery.dataTables.min",
        bootstrapEditable: "lib/bootstrap-editable/bootstrap-editable.min",
        wysihtml5: "lib/bootstrap-editable/wysihtml5/wysihtml5",
        wysihtml5_0_3_0: "lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0.min",
        bootstrapWysihtml: "lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2.min",
        select2: "lib/select2/select2",
        bootstrap: "lib/bootstrap/bootstrap"


        //Development
//        jquery: "lib/jquery/jquery",
//        jqueryUI: "lib/jquery-ui/jquery-ui",
//        jGrowl: "lib/jquery-jgrowl/jquery.jgrowl",
//        underscore: "lib/underscore/underscore",
//        backbone: "lib/backbone/backbone",
//        marionette: "lib/marionette/backbone.marionette",
//        backboneValidation: "lib/backbone-validation/backbone-validation-amd",
//        backboneSyphon: "lib/backbone-syphon/backbone.syphon",
//
//        //Utils
//        moment: "lib/utils/moment.min",
//        dateTimePicker: "lib/utils/bootstrap-datetimepicker.min",
//        dataTables: "lib/jquery-dataTables/jquery.dataTables",
//        bootstrapEditable: "lib/bootstrap-editable/bootstrap-editable",
//        wysihtml5: "lib/bootstrap-editable/wysihtml5/wysihtml5",
//        wysihtml5_0_3_0: "lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0",
//        bootstrapWysihtml: "lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2",
//        select2: "lib/select2/select2",
//        bootstrap: "lib/bootstrap/bootstrap"
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

        marionetteLoading: {
            deps: ["marionette"]
        },

        templateLoader: {
            deps: ["marionette"]
        },

        dateTimePicker: {
            deps: ["jquery"]
        },

        dataTables: {
            deps: ["jquery"]
        },
//
        jGrowl: {
            deps: ["jquery"]
        },

        jqueryUI: {
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

        select2: {
            deps: ["jquery"]
        }
    }

});

var dependencies = [
//    "main", //???

    "marionette",
    "marionetteLoading",
    "moment",
    "jquery",
    "jqueryUI",
    "jGrowl",
    "backboneValidation",
    "backboneSyphon",
    "bootstrapEditable",
    "wysihtml5", //XEditable extension
    "bootstrap",
    "select2",

    "dataTables",
    "dateTimePicker"

];

require(dependencies,
    function (Marionette) {
        console.log("Init Application...");
        window.Application = new Marionette.Application();
    //    alert("App starting");
        Application.addRegions({
            headerRegion: "#header-region",
            sidebar: "#sidebar-region",
            pageContent: "#page-content-region",
            footerRegion: "#footer-region"
        });

        Application.on("initialize:after", function(){
            console.log("Application has started");
        });

        require(["modules_old/main/loader"], function () {
            console.log("Start Application...");
            Application.start();
        });

        return Application;
    }
);



