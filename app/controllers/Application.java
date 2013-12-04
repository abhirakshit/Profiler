package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

public class Application extends Controller {
  
//	public static final String USER_LABEL = "User";
//	public static final String ADMIN_LABEL = "Admin";
//	public static final String SUPER_ADMIN_LABEL = "Super Admin";
	
	public static final String USER = "user";
	public static final String ADMIN = "admin";
	public static final String SUPER_ADMIN = "superAdmin";
	
    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }
  
}
