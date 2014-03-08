requirejs.config({

    paths: {
        //Build
        jquery: "lib/jquery/jquery.min",
        jqueryUI: "lib/jquery-ui/jquery-ui.min",
        jGrowl: "lib/jquery-jgrowl/jquery.jgrowl.min",
        underscore: "lib/underscore/underscore-min",
        backbone: "lib/backbone/backbone",
//        backbone: "lib/backbone/backbone-min",
        marionette: "lib/marionette/backbone.marionette",
//        marionette: "lib/marionette/backbone.marionette.min",
        backboneValidation: "lib/backbone-validation/backbone-validation-amd-min",
        backboneSyphon: "lib/backbone-syphon/backbone.syphon.min",
        marionette_config_application: "config/marionette/application",
        marionette_config_module: "config/marionette/module",
        backbone_config_sync: "config/backbone/sync",
        templateLoader: "config/app/templateLoader/templateLoader",
        spin: "lib/spin/spin",
        jquerySpin: "lib/spin/jquery.spin",

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

//        marionetteLoading: {
//            deps: ["marionette"]
//        },

        marionette_config_application: {
            deps: ["marionette"]
        },

        marionette_config_module: {
            deps: ["marionette"]
        },

        backbone_config_sync: {
            deps: ["backbone"]
        },

        templateLoader: {
            deps: ["marionette"]
        },

        jquerySpin: {
            deps: ["jquery", "spin"]
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

        wysihtml5: { // This is with the xeditable
            deps: ["bootstrapEditable"]
        },

        wysihtml5_0_3_0: {
            deps: ["jquery"]
        },

        bootstrapWysihtml: {
            deps: ["wysihtml5_0_3_0"]
        },

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
    "jGrowl",
    "backboneValidation",
    "backboneSyphon",
    "bootstrapEditable",
    "wysihtml5", //XEditable extension
    "bootstrap",
    "select2",
    "dataTables",
    "dateTimePicker",
    "marionette_config_application",
    "marionette_config_module",
    "backbone_config_sync",
    "templateLoader",
    "jquerySpin"

];

require(dependencies,
    function (Marionette) {
        console.log("Init Application...");
        window.Application = new Marionette.Application();

        Application.MODULES_LOADED = "modules:loaded";
        Application.UNREGISTER_INSTANCE = "unregister:instance";
        Application.REGISTER_INSTANCE = "register:instance";
        Application.DEFAULT_REGION = "default:region";
        Application.rootRoute = "career";

        Application.addRegions({
            headerRegion: "#header-region",
            sidebarRegion: "#sidebar-region",
            pageContentRegion: "#page-content-region",
            footerRegion: "#footer-region"
        });


        Application.reqres.setHandler(Application.DEFAULT_REGION, function () {
            return Application.pageContentRegion;
        });

        Application.commands.setHandler(Application.REGISTER_INSTANCE, function (instance, id) {
            Application.register(instance, id);
        });

        Application.commands.setHandler(Application.UNREGISTER_INSTANCE, function (instance, id) {
            Application.unregister(instance, id);
        });

        Application.addInitializer(function () {
//            console.log("addInit");
            Application.module("Header").start();
            Application.module("Footer").start();
            Application.module("Sidebar").start();
            Application.module("Profile").start();
            Application.module("Career").start();
        });


        require([
            "modules/main/main_app"
        ], function () {
            console.log("Setup...");
//            Application.mainRouter = new Application.Router();
        });

        require([
            "modules/header/header_app",
            "modules/footer/footer_app",
            "modules/sidebar/sidebar_app",
            "modules/profile/profile_app",
            "modules/career/career_app",
            "modules/settings/settings_app"
        ], function () {
            console.log("Start Application...");
            Application.start();
        });

        return Application;
    }
);


