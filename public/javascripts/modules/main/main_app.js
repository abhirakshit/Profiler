define([
    "config/app/consts",
    "config/app/utils",
    "modules/entities/base/_utilities",
    "modules/entities/base/models",
    "modules/entities/base/collections",
    "modules/entities/user",

    "modules/views/_view",
    "modules/views/collectionview",
    "modules/views/compositeview",
    "modules/views/itemview",
    "modules/views/layout",
    "modules/views/utils/utils",
    "modules/views/validation/validationMessages",

    "modules/controllers/base_controller",

    "config/app/config_app"
], function(){
    Application.module("Main", function(Main, Application, Backbone, Marionette) {
        console.log("Load Main Dependencies");
        Application.ForumUrl = "http://counsela.org/";
        Application.Config.setUpXEditableConfig();

        if (Application.request(Application.IS_USER_ADMIN)) {
            Application.USER_IS_ADMIN = true;
        }

        Application.commands.setHandler(Application.MODULES_LOADED, function (rootRoute) {
            Application.startHistory();
            if (!Application.getCurrentRoute())
                Application.navigate(Application.rootRoute, {trigger: true});
        });

        Application.commands.setHandler(Application.SHOW_MODULE, function(moduleEvt){

            if (Application.FORUM_SHOW === moduleEvt) {
                window.open(Application.ForumUrl,'_blank');
                return;
            }

            Application.execute(Application.SET_SIDEBAR, moduleEvt);
            Application.execute(moduleEvt);
        });
    });
});