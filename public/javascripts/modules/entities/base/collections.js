define([], function(){
    Application.module("Entities", function(Entities, Application, Backbone, Marionette, $, _) {
        Entities.Collection = Backbone.Collection.extend({
            getIdToTitleArrayMap: function() {
                return this.getIdToTextMap("title");
//                return _.map(this.models, function(model){
//                    return {id: model.get("id"), text: model.get("title")}
//                });
            },

            getValueToTitleArrayMap: function() {
                return _.map(this.models, function(model){
                    return {value: model.get("id"), text: model.get("title")}
                });
            },

            getIdToTextMap: function(textField) {
                return _.map(this.models, function(model){
                    return {id: model.get("id"), text: model.get(textField)}
                });
            }

        });

    });
});