define(function(){
Application.module("Profiles", function(Profiles, Application, Backbone, Marionette, $, _) {

    Profiles.views.StudentProfileLayout = Marionette.Layout.extend({

        template: "profiles/views/profile/student/layout",
        className: "span8",

        regions : {
            institutionRegion: "#institution",
            careerRegion: "#career",
            academicRegion: "#academic",
            personalRegion: "#personal"
        }
    });

    Profiles.views.InstitutionalView = Marionette.ItemView.extend({
        model: Application.Base.models.User,
        template: "profiles/views/profile/student/institutionalView",

        serializeData: function(){
            this.data = this.model.toJSON();
            return this.data;
        },

        onRender: function() {
            Backbone.Validation.bind(this);
            this.setupInstitutionView();
        },

        setupInstitutionView: function() {
            //turn to inline mode
            var that = this;
//            $.fn.editable.defaults.mode = 'inline';
//            $.fn.editable.defaults.ajaxOptions = {type: "PATCH", dataType: 'json'};

            //Institution
            var allInstJson = Application.Base.allSchoolsCollection.toJSON();
            var institutionMap = _.map(allInstJson, function(inst){
                return {id: inst.id, text: inst.name}
            });

            var instId = ""
            if (that.data.institution)
                instId = that.data.institution.id;

            Profiles.setupSelect2EditableBox(this.$el, this.model, "schoolId", institutionMap, "Enter Institution Name", instId)


            //All Counselor names
            var allCounselorJson = Application.Base.allCounselorCollection.toJSON();
            var counselorMap = _.map(allCounselorJson, function(counselor){
                return {id: counselor.id, text: counselor.fullName}
            });

            Profiles.setupSelect2EditableBox(this.$el, this.model, "ownerId", counselorMap, "Enter Counselor Name",that.data.ownerId)
        }
    });


    Profiles.setupSelect2EditableBox = function(el, model, id, source, emptyText, initialValue){
        el.find('#' + id).editable({
            source: source,
            type: "select2",
            value: initialValue,
            emptytext: emptyText,
            select2: {
                placeholder: emptyText
//                    multiple: true
            },
            success: function(response, value) {
                console.log(value);

                model.save(id, value, {
                    wait: true,
                    patch: true,
                    success: function(newModel){
                        console.log("Saved on server!!")
                    },

                    error: function(x, response) {
                        console.log("Error on server!! -- " + response)
                        return response;
                    }
                });
            }
        });
    }

    Profiles.views.CareerView = Marionette.ItemView.extend({
        model: Application.Base.models.User,
        template: "profiles/views/profile/student/careerView",

        serializeData: function(){
            this.data = this.model.toJSON();
            return this.data;
        },

        onRender: function() {
            Backbone.Validation.bind(this);
            this.setupCareerView();
        },

        setupCareerView: function() {
             var countrySource = [
                {id: 'uk', text: 'United Kingdom'},
                {id: 'cn', text: 'Canada'},
                {id: 'au', text: 'Australia'},
                {id: 'nz', text: 'New Zealand'},
                {id: 'us', text: 'United States'},
                {id: 'in', text: 'India'},
                {id: 'ru', text: 'Russia'}
            ];

            var fieldsSource = [
                {id: 'en', text: 'Engineering'},
                {id: 'md', text: 'Medical'},
                {id: 'fa', text: 'Fine Arts'},
                {id: 'cm', text: 'Commerce'}
            ];

            var programsSource = [
                {id: 'ab', text: 'Architect Babu'},
                {id: 'ds', text: 'Dagdaar Sahib'},
                {id: 'na', text: 'Nachaiyya'},
                {id: 'kb', text: 'Kalam wali bai'},
                {id: 'gw', text: 'Gawaia'}
            ];


            Profiles.setupSelect2EditableBox(this.$el, this.model, "countryInterested", countrySource, "Select Country", this.data.countryInterested)
            Profiles.setupSelect2EditableBox(this.$el, this.model, "fieldInterested", fieldsSource, "Select Field", this.data.fieldInterested)
            Profiles.setupSelect2EditableBox(this.$el, this.model, "programInterested", programsSource, "Select Program", this.data.programInterested)

        }
    });

    Profiles.views.AcademicView = Marionette.ItemView.extend({
        model: Application.Base.models.User,
        template: "profiles/views/profile/student/academicView",

        serializeData: function(){
            this.data = this.model.toJSON();
            return this.data;
        },

        onRender: function() {
            Backbone.Validation.bind(this);
            this.setupAcademicView();
        },

        setupEditableBox: function(id, emptyText, initialValue, type){
            var that = this;
            this.$el.find("#" + id).editable({
                type: type,
                emptytext: emptyText,
                value: initialValue,
                success: function(response, value) {
                    that.model.save(id, value, {
                        wait: true,
                        patch: true,
                        success: function(newModel){
                            console.log("Saved on server!!")
                        },

                        error: function(x, response) {
                            console.log("Error on server!! -- " + response)
                            return response;
                        }
                    })
                }
            })
        },

        setupAcademicView: function() {
            this.setupEditableBox("highSchoolScore", "Enter Xth score/grade", this.data.highSchoolScore, "text");
            this.setupEditableBox("seniorSecondaryScore", "Enter XIIth score/grade", this.data.seniorSecondaryScore, "text");
            this.setupEditableBox("gre", "Enter GRE score/grade", this.data.gre, "text");
            this.setupEditableBox("gmat", "Enter GMAT score/grade", this.data.gmat, "text");
            this.setupEditableBox("sat", "Enter SAT score/grade", this.data.sat, "text");
            this.setupEditableBox("toefl", "Enter TOEFL score/grade", this.data.toefl, "text");
            this.setupEditableBox("ielts", "Enter IELTS score/grade", this.data.ielts, "text");
            this.setupEditableBox("remarks", "Enter any other details you would like", this.data.remarks, "textarea");
        }
    });

    Profiles.views.showProfile = Marionette.ItemView.extend({
        template: "profiles/views/profile/profile",

        serializeData: function(){
            this.data = this.model.toJSON();
            this.data.editProfileUrl = "editProfile";
            this.data.editPasswordUrl = "editPassword";
            return this.data;
        }
    });
});
});