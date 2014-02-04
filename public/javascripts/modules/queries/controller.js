define(
    ["modules/queries/views/query"],
    function(){
Application.module("Queries", function(Queries, Application, Backbone, Marionette, $, _) {
    Queries.onTemplatesLoaded = function() {
        this.show();
    };

    Queries.show = function() {
        console.log("Show Queries...");
        Queries.controller = new Queries.Controller({
            region: Application.pageContent
        });

        Queries.router = new Queries.Router({
            controller: Queries.controller
        })

//        Queries.controller.showQueriesHome();
    };

    Queries.homeNav = "queries";
    Queries.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "queries": "showQueriesHome"
        }
    });

    Queries.Controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
            console.log('Queries Module Initialized');
        },

        showQueriesHome: function() {
            Queries.mainLayout = new Application.Base.views.MainLayout();
            this.region.show(Queries.mainLayout);

            //Add views
            Queries.addPageHeader();
            //Queries.addNavTabs();
            Queries.showQueriesSection();

//            Application.Base.onHoverEditable(Queries.mainLayout);
        }

    });

    Queries.addPageHeader = function() {
        var headerLayoutView = new Application.Base.views.HeaderLayout();
        Queries.mainLayout.pageHeaderRegion.show(headerLayoutView);

        //Show header
        var pgHeader = new Application.Base.views.PageHeader({
            model: new Backbone.Model({header: "Queries"})
        });
        headerLayoutView.pageHeader.show(pgHeader);

    };


//    Queries.models.studentProfile = Marionette.Model.extend()

    Queries.showAddQueryBtn = function(layout, user) {
        var addQueryView = new Queries.views.addNewQuery({
//            model : new Application.Base.models.Generic([],{
//                urlRoot: "/query"
//            })
            model : user
        });

        this.listenTo(addQueryView, Queries.createNewQueryEvt, function (view){
            // Make sure counselor exists for the user
            var queryText = view.addQueryEditor.val();
            if (queryText) {
                view.model.save({queryText: queryText}, {
                    patch: true,
                    wait: true,
                    success: function (model, response) {
                        $.jGrowl("Query created!!", {theme: 'jGrowlSuccess'});
                        console.dir(model);
                        Queries.showMyQueries(layout, model);
                    },
                    error: function (model, error) {
                        $.jGrowl("Error saving query!\n" + error.responseText, {theme: 'jGrowlError'});
                        console.error("Query not saved on server: " + error.responseText);
                    }
                })
            }

//            view.model.save({queryStr: view.addQueryEditor.val()}, {
//                wait: true,
//                success: function (model, response) {
//                    $.jGrowl("Query created!!", {theme: 'jGrowlSuccess'});
//                    console.dir(model);
//                    Queries.showMyQueries(layout);
//                },
//                error: function (model, error) {
//                    $.jGrowl("Error saving query!\n" + error.responseText, {theme: 'jGrowlError'});
//                    console.error("Query not saved on server: " + error.responseText);
//                }
//            })
        });

        layout.newQueryRegion.show(addQueryView);

    };

    Queries.showMyQueries = function(layout, user) {
        var myQueriesTablelayout = new Application.Base.views.TableLayout();
        layout.queryTableRegion.show(myQueriesTablelayout);

        myQueriesTablelayout.tableHeaderRegion.show(this.setTableHeaderView("My Queries"));

        // Get all my queries
        var queryCollection = new Application.Base.collections.Generic(
//            Application.Base.loggedUser.get('queries')
            user.get('queries')
        )

        var tableView = this.setTableBodyView({
//            containerTemplate: "queries/views/student/tableContainer",
//            rowTemplate: "queries/views/student/row",
            collection: queryCollection
        });
        myQueriesTablelayout.tableBodyRegion.show(tableView);
        Application.Base.addDataTables(myQueriesTablelayout);
    }

    Queries.showQueriesSection = function() {
        var studQueryLayoutView = new Queries.views.StudentQueriesLayout();
        Queries.mainLayout.tabContentRegion.show(studQueryLayoutView);
        var user = Application.Base.loggedUser;
        Queries.showAddQueryBtn(studQueryLayoutView, user);
        Queries.showMyQueries(studQueryLayoutView, user);
        Queries.router.navigate(Queries.homeNav);
    }

    Queries.setTableHeaderView = function(headerText) {
        return new Application.Base.views.TableHeader({
            model: new Backbone.Model({header: headerText})
        });
    };

    Queries.setTableBodyView = function(options) {
//        var tableBodyView = new Application.Base.views.TableCompositeView(options);
        var tableBodyView = new Queries.views.MyQueriesTable(options);

//        this.listenTo(tableBodyView, Application.Base.tableViewRowClickedEvt, function(queryModel){
////            this.showEnquiry(enquiryModel);
////            Enquiry.showCreateEnquiryForm(enquiryModel, true);
//            console.log("Show query")
//        });

        return tableBodyView
    };

});
});