define([
    "modules/career/career_controller",
    "modules/loading/loading_controller"
], function(){
    Application.module("Career", function(Career, Application, Backbone, Marionette, $, _) {

        Career.rootRoute = "career";
        Career.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "career": "show",
                "career/": "show",
                "career/:streamId": "showStream",
                "career/:streamId/": "showStream",
                "career/:streamId/:majorId/": "showMajor",
                "career/:streamId/:majorId": "showMajor"
            }
        });

        var API = {
            getController: function() {
                return new Career.Controller({
                    region: Application.pageContentRegion
                });
            },

            show: function () {
                console.log("Show Career");
                this.getController().showHomeContent();
                Application.commands.execute(Application.SET_SIDEBAR, Application.CAREER_SHOW);
            },

            showStream: function(streamId) {
//                console.log("Show Stream: " + streamId);
                var region = this.getController().layout.tabContentRegion;
                Application.commands.execute(Application.SET_SIDEBAR, Application.CAREER_SHOW);
                Application.commands.execute(Application.STREAM_SHOW, region, streamId);
            },

            showMajor: function(streamId, majorId) {
//                console.log("Show Major: " + streamId + "/" + majorId);
                var region = this.getController().layout.tabContentRegion;
                Application.commands.execute(Application.SET_SIDEBAR, Application.CAREER_SHOW);
                Application.commands.execute(Application.MAJOR_SHOW, region, streamId, majorId);
            }
        };


        Career.setup = function () {
            new Career.Router({
                controller: API
            });
            Application.commands.execute(Application.MODULES_LOADED, Career.rootRoute);
        };


        Career.on(Application.START, function () {
            console.log("Career start...");
//            Marionette.TemplateLoader.loadModuleTemplates(Career.Navigation, function(){
                Marionette.TemplateLoader.loadModuleTemplates(Career.Stream, function(){
                    Marionette.TemplateLoader.loadModuleTemplates(Career.Major, function(){
                        Marionette.TemplateLoader.loadModuleTemplates(Career.Home, function(){
                            Marionette.TemplateLoader.loadModuleTemplates(Career, Career.setup);
                        });
                    });
                });
//            })
        });

        Application.commands.setHandler(Application.CAREER_SHOW, function(){
            API.show();
            Application.navigate(Career.rootRoute);
        });
    });
});