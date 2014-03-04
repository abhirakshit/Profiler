define("modules/templateLoader/templateLoader",[],function(){Marionette.TemplateLoader=function(e,t){var n={};return n.templatePath="templates/",n.templateExt=".html",n.templatePrefix="",n.loadModuleTemplates=function(e,t){n.templatePath=e.templatePath,n.templatePrefix=e.prefix;var r=[];for(var i in e.views){var s=e.views[i],o=s.prototype.template;if(!o||typeof o=="function")continue;r.push(s.prototype.template)}var u=n.preloadTemplates(r,e);$.when(u).done(t)},n.preloadTemplates=function(e,r){var i=$.Deferred(),s=[];t.each(e,function(t,r){s[r]=n.preloadTemplate(e[r],n)});var o=s.length;return t.each(s,function(e){$.when(e).done(function(){o--,o==0&&i.resolveWith(r)})}),i},n.preloadTemplate=function(e,t){var r=$.Deferred(),i=this,s,o;if(!e||e.length==0)throw o=new Error("No templateId was specified - please provide a valid template id or filename."),o.name="NoTemplateSpecified",o;var u=e.substr(0,1)==="#",a=u?$(e).html():null;if(!(a&&a.length>0)){var f=e.indexOf("-"),l=u?e.substr(1):f>0?e.substr(f+1):e,c=n.templatePath+l+n.templateExt;return $.get(c,function(i){if(!i||i.length==0)throw s="Could not find template: '"+e+"'",o=new Error(s),o.name="NoTemplateError",o;n.storeTemplate(e,i),r.resolveWith(t)}),r}n.storeTemplate(e,a),r.resolveWith(t)},n.storeTemplate=function(t,n){n=e.TemplateCache.prototype.compileTemplate(n);var r=new e.TemplateCache(t);r.compiledTemplate=n,e.TemplateCache.templateCaches[t]===undefined&&(e.TemplateCache.templateCaches[t]=r)},n}(Marionette,_)}),define("modules/base/setup",["modules_old/templateLoader/templateLoader"],function(){Application.module("Base",function(e){this.prefix="base",this.templatePath="assets/javascripts/modules/",this.views={},this.template=function(e){return this.prefix+"-"+e},this.models={},this.collections={}})}),define("modules/base/models/multiSelect",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){e.collections.MultiSelect=n.Collection.extend({model:e.models.Generic,initialize:function(e,t){t&&t.url&&(this.url=t.url)},parse:function(e){return e}})})}),define("modules/base/models/base",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){e.userUrl="/user",e.models.Generic=n.Model.extend({initialize:function(e,t){t&&t.urlRoot&&(this.urlRoot=t.urlRoot),e&&e.urlRoot&&(this.urlRoot=e.urlRoot),t&&t.url&&(this.url=t.url),e&&e.url&&(this.url=e.url)}}),e.collections.Generic=n.Collection.extend({model:e.models.Generic,initialize:function(e,t){t&&t.url&&(this.url=t.url),e&&e.url&&(this.url=e.url)}}),e.models.User=n.Model.extend({urlRoot:e.userUrl})})}),define("modules/base/views/layouts/layouts",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){e.views.PageLayout=r.Layout.extend({template:"base/views/layouts/mainLayout",regions:{pageHeaderRegion:"#page-header",navigationTabsRegion:"#nav-tabs",tabContentRegion:"#tab-content"}}),e.views.HeaderLayout=r.Layout.extend({template:"base/views/layouts/headerLayout",regions:{pageHeader:"#header",addEnquiryBtn:"#add-enquiry-btn"}})})}),define("modules/base/views/tables/tables",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){e.views.TableLayout=r.Layout.extend({template:"base/views/tables/tableLayout",regions:{tableHeaderRegion:"#table-header",tableBodyRegion:"#table-body"}});var o="<legend><%=args.header%></legend>";e.views.TableHeader=r.ItemView.extend({template:function(e){var t=e.header;return s.template(o,{header:t},{variable:"args"})}}),e.rowClicked="rowClicked",e.rowClickedEvt="RowView:rowClicked",e.tableViewRowClickedEvt="TableView:RowView:rowClicked"})}),define("modules/base/views/forms/formElems",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){e.views.AddButton=r.ItemView.extend({template:"base/views/forms/createButton",className:"primaryRightBtn",events:{click:"triggerClick"},triggerClick:function(e){e.preventDefault(),this.trigger("Base.AddButton.Click",this.model)}}),e.views.DropDown=r.ItemView.extend({className:"controls",template:"base/views/forms/dropDown",initialize:function(){this.optionsList=new t.Base.collections.MultiSelect([],{url:this.model.get("url")}),this.optionsList.fetch({async:!1}),this.model.set("optionsList",this.optionsList.models)}})})}),define("modules/base/views/headers/pageHeader",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){var o='<div class="page-title"><%=args.header%></div>';e.views.PageHeader=r.ItemView.extend({template:function(e){var t=e.header;return s.template(o,{header:t},{variable:"args"})}})})}),define("modules/base/views/navigation/navTabs",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){e.views.NavTab=r.ItemView.extend({template:"base/views/navigation/navTab",tagName:"li",events:{click:"clicked"},select:function(){this.$el.addClass("active")},unSelect:function(){this.$el.removeClass("active")},clicked:function(e){e.preventDefault(),this.trigger("NavTab:Clicked","Navigate")}}),e.HeaderTabCollection=r.CollectionView.extend({itemView:e.views.NavTab,tagName:"ul",className:"nav nav-tabs",initialize:function(){var e=this;this.on("itemview:NavTab:Clicked",function(t,n){e.trigger("collectionView:itemview:NavTab:Clicked",t.model.get("url"))})},unSelectAll:function(){this.children.each(function(e){e.unSelect()})},selectTabView:function(e){this.unSelectAll();var t=this.children.find(function(t){return t.model.get("url")==e});t.select()}})})}),define("modules/base/views/validation/validationMessages",["modules_old/base/setup"],function(){Application.module("Base",function(e,t,n,r,i,s){s.extend(n.Validation.callbacks,{valid:function(e,t,n){var r,i;r=e.$("["+n+"="+t+"]"),i=r.parents(".control-group"),i.removeClass("error");if(r.data("error-style")!=="tooltip")return r.data("error-style")==="inline"?i.find(".help-inline.error-message").remove():i.find(".help-block.error-message").remove();if(r.data("tooltip"))return r.tooltip("hide")},invalid:function(e,t,n,r){var i,s,o,u;return i=e.$("["+r+"="+t+"]"),s=i.parents(".control-group"),s.addClass("error"),i.data("error-style")==="tooltip"?(o=i.data("tooltip-position")||"right",i.tooltip({placement:o,trigger:"manual",title:n}),i.tooltip("show")):i.data("error-style")==="inline"?(s.find(".help-inline").length===0&&s.find(".controls").append('<span class="help-inline error-message"></span>'),u=s.find(".help-inline"),u.text(n)):(s.find(".help-block").length===0&&s.find(".controls").append('<p class="help-block error-message"></p>'),u=s.find(".help-block"),u.text(n))}})})}),define("modules/base/controller",["modules_old/base/models/multiSelect","modules_old/base/models/base","modules_old/base/views/layouts/layouts","modules_old/base/views/tables/tables","modules_old/base/views/forms/formElems","modules_old/base/views/headers/pageHeader","modules_old/base/views/navigation/navTabs","modules_old/base/views/validation/validationMessages"],function(){Application.module("Base",function(e,t,n,r,i,s){e.STUDENT_ROLE="student",e.COUNSELOR_ROLE="counselor",e.ADMIN_ROLE="admin",e.SUPER_ADMIN_ROLE="superAdmin",e.getAllCounselorUrl="/users/counselors",e.getAllScoolsUrl="/schools/all",e.loggedUserId=window.userId.replace(/&quot;/g,""),e.Router=r.AppRouter.extend({appRoutes:{home:"showAppHome"}}),e.Controller=r.Controller.extend({showAppHome:function(){}}),updateLoggedUser=function(){e.loggedUser=new e.models.User({id:e.loggedUserId}),e.loggedUser.fetch({async:!1})},e.isAdmin=function(){var n=e.loggedUser.attributes.roleType;return n==t.Base.ADMIN_ROLE||n==t.Base.SUPER_ADMIN_ROLE?!0:!1},e.isSuperAdmin=function(){var n=e.loggedUser.attributes.roleType;return n==t.Base.SUPER_ADMIN_ROLE?!0:!1},populateCounselorCollection=function(){e.allCounselorCollection=new e.collections.Generic([],{url:e.getAllCounselorUrl}),e.allCounselorCollection.fetch({async:!1})},populateInstitutionCollection=function(){e.allSchoolsCollection=new e.collections.Generic([],{url:e.getAllScoolsUrl}),e.allSchoolsCollection.fetch({async:!1})},e.onTemplatesLoaded=function(){e.show()},setUpXEditableConfig=function(){i.fn.editable.defaults.mode="inline",i.fn.editable.defaults.ajaxOptions={type:"PATCH",dataType:"json"},!e.isAdmin()&&!e.isSuperAdmin()&&(i.fn.editable.defaults.disabled="true")},e.show=function(){console.log("Show Base..."),e.controller=new e.Controller,e.router=new e.Router({controller:e.controller}),updateLoggedUser(),setUpXEditableConfig(),populateInstitutionCollection(),populateCounselorCollection()},e.showSearchHomeEvt="showSearchHome",e.showQueriesHomeEvt="showQueriesHome",e.showProfilesHomeEvt="showProfilesHome",e.showSettingsHomeEvt="showSettingsHome",t.vent.on("all",function(n,r){e.showQueriesHomeEvt==n?(t.Queries.controller.showQueriesHome(),t.Sidebar.activateSidebarTab(t.Sidebar.NavQueriesId)):e.showProfilesHomeEvt==n?(t.Profiles.controller.showProfilesHome(),t.Sidebar.activateSidebarTab(t.Sidebar.NavProfilesId)):e.showSettingsHomeEvt==n?(t.Settings.controller.showSettingsHome(),t.Sidebar.activateSidebarTab(t.Sidebar.NavSettingsId)):e.showSearchHomeEvt==n&&(t.Search.controller.showSearchHome(),t.Sidebar.activateSidebarTab(t.Sidebar.NavSearchId))}),e.getCounselorName=function(t){if(t){var n=s.findWhere(e.allCounselorCollection.toJSON(),{id:t});if(n)return n.fullName}return""},e.dateViewHelper={formatDate:function(e,t){return moment(e).format(t)},getCurrentDate:function(e){return moment().format(e)}},e.addDataTables=function(e){e.$el.find(".dataTable").dataTable({bJQueryUI:!0,sPaginationType:"full_numbers",bInfo:!1})},e.onHoverEditable=function(e){e.$el.find(".editable").hover(function(){i(this).addClass("over")},function(){i(this).removeClass("over")})}})}),define("modules/base/loader",["modules_old/base/controller"],function(){Application.module("Base",function(e,t,n,r,i,s){e.addInitializer(function(){console.log("Init Base..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})}),define("modules/header/loader",["modules_old/base/loader"],function(){Application.module("Header",function(e,t,n,r,i,s){require(["modules_old/header/controller"],function(){e.addInitializer(function(){console.log("Init Header..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/sidebar/loader",["modules_old/base/loader"],function(){Application.module("Sidebar",function(e,t,n,r,i,s){require(["modules_old/sidebar/controller"],function(){e.addInitializer(function(){console.log("Load Sidebar..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/search/loader",["modules_old/base/loader"],function(){Application.module("Search",function(e,t,n,r,i,s){require(["modules_old/search/controller"],function(){e.addInitializer(function(){console.log("Load Search..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/settings/loader",["modules_old/base/loader"],function(){Application.module("Settings",function(e,t,n,r,i,s){require(["modules_old/settings/controller"],function(){e.addInitializer(function(){console.log("Load Settings..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/footer/loader",["modules_old/base/loader"],function(){Application.module("Footer",function(e,t,n,r,i,s){require(["modules_old/footer/controller"],function(){e.addInitializer(function(){console.log("Init Footer..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/queries/loader",["modules_old/base/loader"],function(){Application.module("Queries",function(e,t,n,r,i,s){require(["modules_old/queries/controller"],function(){e.addInitializer(function(){console.log("Load Queries..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/profiles/loader",["modules_old/base/loader"],function(){Application.module("Profiles",function(e,t,n,r,i,s){require(["modules_old/profiles/controller"],function(){e.addInitializer(function(){console.log("Load Profiles..."),r.TemplateLoader.loadModuleTemplates(e,e.show)})})})}),define("modules/main/loader",["modules_old/header/loader","modules_old/sidebar/loader","modules_old/search/loader","modules_old/settings/loader","modules_old/footer/loader","modules_old/queries/loader","modules_old/profiles/loader"],function(){console.log("Init Main..."),Application.module("Main",function(e,t,n,r,i,s){e.addInitializer(function(){console.log("Start Main..."),r.TemplateLoader.loadModuleTemplates(e,e.show),n.history&&(console.log("Start Backbone history..."),n.history.start())})})}),requirejs.config({paths:{jquery:"lib/jquery/jquery.min",jqueryUI:"lib/jquery-ui/jquery-ui.min",jGrowl:"lib/jquery-jgrowl/jquery.jgrowl.min",underscore:"lib/underscore/underscore-min",backbone:"lib/backbone/backbone-min",marionette:"lib/marionette/backbone.marionette.min",backboneValidation:"lib/backbone-validation/backbone-validation-amd-min",backboneSyphon:"lib/backbone-syphon/backbone.syphon.min",moment:"lib/utils/moment.min",dateTimePicker:"lib/utils/bootstrap-datetimepicker.min",dataTables:"lib/jquery-dataTables/jquery.dataTables.min",bootstrapEditable:"lib/bootstrap-editable/bootstrap-editable.min",wysihtml5:"lib/bootstrap-editable/wysihtml5/wysihtml5",wysihtml5_0_3_0:"lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0.min",bootstrapWysihtml:"lib/bootstrap-editable/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2.min",select2:"lib/select2/select2",bootstrap:"lib/bootstrap/bootstrap"},shim:{underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},marionette:{deps:["backbone"],exports:"Marionette"},templateLoader:{deps:["marionette"]},dateTimePicker:{deps:["jquery"]},dataTables:{deps:["jquery"]},jGrowl:{deps:["jquery"]},jqueryUI:{deps:["jquery"]},bootstrap:{deps:["jquery"]},bootstrapEditable:{deps:["bootstrap","select2","bootstrapWysihtml"]},wysihtml5:{deps:["bootstrapEditable"]},wysihtml5_0_3_0:{deps:["jquery"]},bootstrapWysihtml:{deps:["wysihtml5_0_3_0"]},select2:{deps:["jquery"]}}});var dependencies=["marionette","moment","jquery","jqueryUI","jGrowl","backboneValidation","backboneSyphon","bootstrapEditable","wysihtml5","bootstrap","select2","dataTables","dateTimePicker"];require(dependencies,function(e){return console.log("Init Application..."),window.Application=new e.Application,Application.addRegions({headerRegion:"#header-region",sidebar:"#sidebar-region",pageContent:"#page-content-region",footerRegion:"#footer-region"}),Application.on("initialize:after",function(){console.log("Application has started")}),require(["modules_old/main/loader"],function(){console.log("Start Application..."),Application.start()}),Application}),define("app",function(){});