define(["modules/base/controllers/baseController"], function () {
    Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {
        Base.views.Loading = Marionette.ItemView.extend({
            template: "base/views/loadingMessage/loadingMessage"
        });

        Base.LoadingController = Base.Controller.extend({
            startMod: function(options) {
                var view = options.view;
                var config = options.config;

                config = _.isBoolean(config)? {} : config;
                _.defaults(config, {
                    entities: this.getEntities(view)
                });
                var loadingView = this.getLoadingView();
                console.log("***Show loading view now");
                this.show(loadingView, {});

                this.showRealView(view, loadingView, config);
            },

            showRealView: function(view, loadingView, config) {
//                console.log("***Entities");
//                console.dir(config.entities);
                var that = this;
                this.listenTo(config.entities.collection, 'sync', function(model, resp, options) {
                    console.log("***Show correct view now");
                    that.show(view, {})
                });
            },

            getEntities: function(view) {
                return _.chain(view).pick("model", "collection").toArray().compact().value();
            },

            getLoadingView: function() {
                return new Base.views.Loading();
            }
        });

        Application.commands.setHandler("show:loading", function(view, options){
            console.log("****Call: " + options.call)
            new Base.LoadingController({
                view: view,
                region: options.region,
                config: options.loading,
                call: options.call
            })
        });
    });
});

