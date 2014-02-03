define(["modules/base/setup"], function () {
    Application.module("Base", function (Base, Application, Backbone, Marionette, $, _) {
        Base.LoadingMessageView = Marionette.ItemView.extend({
            template: "base/views/loadingMessage/loadingMessage"
        });

    });
});

