define(["modules/base/setup"], function () {
    Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {
        Base.Controller = Marionette.Controller.extend({
            initialize: function(options) {
                console.log("Init Base Controller..");
                this.region = options.region;
                this.call = options.call;
                this.startMod(options);
            },

            startMod: function(){},

            show: function(view, options) {
                _.defaults(options, {loading: false, region: this.region});

//                this.setMainView(view);
                return this.manageView(view, options);
            },

//            setMainView: function(view) {
//                if(this.mainView) {return};
//
//                this.mainView = view;
//                return this.listenTo(view, "close", this.close);
//            },

            manageView: function(view, options) {
                if (options.loading) {
                    console.log("***Send Command");
                    Application.execute("show:loading", view, options);
                } else {
                    options.region.show(view);
                    if (this.call)
                        this.call();
                }
            }
        });
    });
});