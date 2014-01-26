package controllers;

import models.Users;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.form.LoginForm;
import controllers.form.SignupForm;
import flexjson.JSONSerializer;

public class Application extends Controller {
  
	public static final String FLASH_MESSAGE_KEY = "message";
	public static final String FLASH_ERROR_KEY = "error";
	
//	public static final String USER_LABEL = "User";
//	public static final String ADMIN_LABEL = "Admin";
//	public static final String SUPER_ADMIN_LABEL = "Super Admin";
	
	public static final String COUNSELOR = "counselor";
	public static final String STUDENT = "student";
	public static final String USER = "user";
	public static final String ADMIN = "admin";
	public static final String SUPER_ADMIN = "superAdmin";
	
	public static final String STATUS_NEW = "New";
	public static final String STATUS_OPEN = "Open";
	public static final String STATUS_CLOSED = "Closed";
	
	
	static final Form<LoginForm> loginForm = Form.form(LoginForm.class);
	static final Form<SignupForm> signupForm = Form.form(SignupForm.class);
	
    public static Result index() {
        if (isUserLoggedIn()) {
        	JSONSerializer serializer = new JSONSerializer();
    		return ok(views.html.index.render(serializer.serialize(getLocalUser().id.toString())));
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
//    		return index();
    		return redirect("/index");
    	}
    }

    public static Result doSignup() {
        	Form<SignupForm> completedForm = signupForm.bindFromRequest();
        	if (completedForm.hasErrors()) {
        		flash(Application.FLASH_ERROR_KEY, completedForm.errors().get("").get(0).message());
        		return badRequest(views.html.login.render(loginForm));
        	} else {
        		//Create User
        		Users.create(completedForm.get());
        		session("email", completedForm.get().email);
        		return redirect("/index");
        	}
        }

    public static Result logout() {
        session().clear();
        flash(Application.FLASH_MESSAGE_KEY, "You have been logged out.");
        return index();
    }
    
    
//    public static Result populateUser() {
//		JsonNode reqJson = request().body().asJson();
//		if (reqJson !=null ||
//				(reqJson.get(UserController.PASSWORD) != null || !reqJson.get(UserController.PASSWORD).asText().isEmpty()) ||
//				(reqJson.get(UserController.CONFIRM_PASSWORD) != null || !reqJson.get(UserController.CONFIRM_PASSWORD).asText().isEmpty()) ||
//				!UserController.checkPasswordMatching(reqJson.get(UserController.PASSWORD).asText(), reqJson.get(UserController.CONFIRM_PASSWORD).asText())
//				) 
//			return badRequest();
//		Users user = Users.create(reqJson);
//		JSONSerializer serializer = new JSONSerializer();
//		return ok(serializer.serialize(user));
//	}
  
}
