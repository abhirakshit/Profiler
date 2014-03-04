define([
    "modules/settings/settings/user/user_view",
    "modules/entities/user"
], function(){
    Application.module("Settings.User", function(User, Application, Backbone, Marionette, $, _) {

        User.Controller = Application.Controllers.Base.extend({
            initialize: function (options) {
                var user = Application.request(Application.GET_LOGGED_USER);
                this.layout = this.getLayout();
                this.listenTo(this.layout, Application.SHOW, function () {
//                    this.showStreamLinks(allStreamsCollection);
//                    this.showPageContent();
//
//                    if (Application.request(Application.IS_USER_ADMIN))
//                        this.showAdminSection();

                });

                this.show(this.layout, {
                    loading: {
                        entities: user
//                        debug: true
                    }
                });
            },

            getLayout: function() {
                return new User.views.Layout();
            }
        })
    })
});