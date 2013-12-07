package controllers;

import models.Users;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.form.LoginForm;

public class Application extends Controller {
  
	public static final String FLASH_MESSAGE_KEY = "message";
	public static final String FLASH_ERROR_KEY = "error";
	
//	public static final String USER_LABEL = "User";
//	public static final String ADMIN_LABEL = "Admin";
//	public static final String SUPER_ADMIN_LABEL = "Super Admin";
	
	public static final String USER = "user";
	public static final String ADMIN = "admin";
	public static final String SUPER_ADMIN = "superAdmin";
	
	static final Form<LoginForm> loginForm = Form.form(LoginForm.class);
    public static Result index() {
        if (isUserLoggedIn()) {
    		return ok(views.html.index.render());
    	}
        return ok(views.html.login.render(loginForm));
    }
    
    public static Users getLocalUser() {
    	String email = session().get("email");
    	if (email == null || email.isEmpty())
    		return null;
		final Users localUser = Users.findByEmail(email);
		return localUser;
	}
    
    public static boolean isUserLoggedIn() {
    	return getLocalUser() != null; 
    }
    
    public static Result doLogin() {
    	Form<LoginForm> completedForm = loginForm.bindFromRequest();
    	if (completedForm.hasErrors()) {
    		flash(Application.FLASH_ERROR_KEY, completedForm.errors().get("").get(0).message());
    		return badRequest(views.html.login.render(loginForm));
    	} else {
    		session("email", completedForm.get().email);
    		return index();
    	}
    }
  
}
