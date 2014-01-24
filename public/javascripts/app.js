requirejs.config({

    /**
     * Heroku Setup
     */
//    appDir: "../",
//    baseUrl: "javascripts",
//    dir: "../../public-build",

    /**
     * Local Setup
     */
    baseUrl: 'assets/javascripts',

    paths: {
        //Framework
        order: "lib/require/plugins/order",
        jquery: "lib/jquery/jquery.min",
        jqueryUI: "lib/jquery-ui/jquery-ui.min",
        jGrowl: "lib/jquery-jgrowl/jquery.jgrowl.min",
        underscore: "lib/underscore/underscore-min",
        backbone: "lib/backbone/backbone-min",
        marionette: "lib/marionette/backbone.marionette.min",
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
    },

    shim: {

//        jqueryUI: {
//            deps: ["jquery"]
//        },

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
//
//        bootstrap: {
//            deps: ["jquery"]
//        },


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

//    modules: [
//    ]
});

var dependencies = [
//    "main", //???

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
    "select2",

    "dataTables",
    "dateTimePicker"

];

require(dependencies,
    function (Marionette) {
        console.log("Init Application...")
        window.Application = new Marionette.Application();
    //    alert("App starting");
        Application.addRegions({
            headerRegion: "#header-region",
            sidebar: "#sidebar-region",
            pageContent: "#page-content-region",
            footer: "#footer-region"
        });

        Application.on("initialize:after", function(){
            console.log("Application has started");
        });

        require(["modules/main/loader"], function () {
            console.log("Start Application...")
            Application.start();
        });

        return Application;
    }
);

//require(dependencies,
//    function (Application) {
//        console.log("Start Application...")
//        Application.start();
//    });


