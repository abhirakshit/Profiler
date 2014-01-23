Application.module("Header", function(Header, Application, Backbone, Marionette, $, _) {

    var Base = Application.module("Base");
//    //Models
//    Header.GenericModel = Backbone.Model.extend();
//    Header.GenericCollection = Backbone.Collection.extend({
//        model: Header.GenericModel
//    })

//    var tabCollection = new Header.GenericCollection([
//        new Header.GenericModel({tabLabel:"Search", tabUrl: "#search"})
//    ])

    var LOGOUT_URL = "logout"

    getUserDropDownOptions = function() {
        return new Base.collections.Generic([
            new Base.models.Generic({optionId:"profile", optionUrl: "#user/profile", optionText: "Profile", iconClass: ""}),
            new Base.models.Generic({optionId:"logout", optionUrl: LOGOUT_URL, optionText: "Logout", iconClass: "icon-off"})
        ])
    };

    getAdminDropDownOptions = function() {
        return new Base.collections.Generic([
            new Base.models.Generic({optionId:"profile", optionUrl: "#user/profile", optionText: "Profile", iconClass: ""}),
//            new Base.models.Generic({optionId:"admin", optionUrl: "#admin", optionText: "Admin", iconClass: ""}),
            new Base.models.Generic({optionId:"logout", optionUrl: LOGOUT_URL, optionText: "Logout", iconClass: "icon-off"})
        ])
    }

    getHeaderTabCollection = function() {
        return new Base.collections.Generic([
            new Base.models.Generic({tabLabel:"Search", tabUrl: "#search"})
        ])
    }

    Header.onTemplatesLoaded = function() {
        this.show();
    };

    Header.show = function(){
        console.log("Show Header");
        Header.layout = new Header.views.Layout();
        Application.headerRegion.show(Header.layout);

        Header.setupLayout();
    };

    Header.setupLayout = function() {
        //Setup Application label
        var appLabel = new Header.views.AppLabel({
            model: new Backbone.Model({
                appLabel: "Career DB"
            })
        });
        Header.layout.appLabel.show(appLabel);

        //TODO: Add Setup nav tabs
//        Header.headerTabCollection = new Header.collections.HeaderTab({
////            collection: tabCollection
//            collection: getHeaderTabCollection()
//        });
//        Header.layout.navTabs.show(Header.headerTabCollection)

        //Setup user dropdowns
        var userDropDownCollectionView = new Header.views.UserDropDownCollection({
            collection: Header.getDropDownOptions(Base.loggedUser),
            model: Base.loggedUser
        });
        Header.layout.userDropDown.show(userDropDownCollectionView);
        this.listenTo(userDropDownCollectionView, "collectionview:itemview:dropdown:selected",
            function(child){
                console.dir(child);

                if (child.attributes.optionUrl == LOGOUT_URL) {
                    $.ajax({
                        url: LOGOUT_URL,
                        success: function() {
                            console.log("Logged Out...");
//                            Base.router.navigate("login", false);
                            window.location.reload();
                        }
                    })
//                    $.ajax({LOGOUT_URL, {
//                        type: "GET"
//                    }
//                    });
                }
            }
        );


    };

    Header.getDropDownOptions = function(user) {
        if(Base.isAdmin())
            return getAdminDropDownOptions();
//        var role = user.attributes.roleType;
//        if (role == Base.ADMIN_ROLE || role == Base.SUPER_ADMIN_ROLE)
////            return adminDropDownOptions;
//            return getAdminDropDownOptions();

//        return userDropDownOptions;
        return getUserDropDownOptions();
    };

//    var userDropDownOptions = new Header.GenericCollection([
//        new Header.GenericModel({optionId:"profile", optionUrl: "#user/profile", optionText: "Profile", iconClass: ""}),
//        new Header.GenericModel({optionId:"logout", optionUrl: "#logout", optionText: "Logout", iconClass: "icon-off"})
//    ])
//
//    var adminDropDownOptions = new Header.GenericCollection([
//        new Header.GenericModel({optionId:"profile", optionUrl: "#user/profile", optionText: "Profile", iconClass: ""}),
//        new Header.GenericModel({optionId:"admin", optionUrl: "#admin", optionText: "Admin", iconClass: ""}),
//        new Header.GenericModel({optionId:"logout", optionUrl: "#logout", optionText: "Logout", iconClass: "icon-off"})
//    ]

});