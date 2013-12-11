Application.module("Base",function (Base, Application, Backbone, Marionette, $, _) {

    Base.views.AddButton = Marionette.ItemView.extend({
        template: "base/views/forms/createButton",
        className: "primaryRightBtn",

        events: {
            "click": "triggerClick"
        },

        triggerClick: function (event) {
            event.preventDefault();
            this.trigger("Base.AddButton.Click", this.model);
        }
    });

    Base.views.DropDown = Marionette.ItemView.extend({
        className: "controls",
        template: "base/views/forms/dropDown",

        initialize: function() {
            this.optionsList = new Application.Base.collections.MultiSelect([], {
                url: this.model.get('url')
            });
            this.optionsList.fetch({async: false});
//            this.model.set("optionsList", this.optionsList.pluck(this.model.get('name')));
            this.model.set("optionsList", this.optionsList.models);

//            var selected = this.model.get('selected');
//            if (selected) {
//                this.model.set("selected", selected);
//            }
        }
    });
});