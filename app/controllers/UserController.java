package controllers;

import models.Majors;
import models.Users;

import org.codehaus.jackson.JsonNode;

import core.CustomForm;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import flexjson.JSONSerializer;

@Security.Authenticated(Secured.class)
public class UserController extends Controller{
	
	public static String PASSWORD = "password";
	public static String CONFIRM_PASSWORD = "confirmPassword";
	public static String EMAIL = "email";
	public static String FIRST_NAME = "firstName";
	public static String LAST_NAME = "lastName";
	
	public static Result show(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.include("institution").include("queries").exclude("password").serialize(Users.findById(id)));
	}
	
	static Form<Users> userForm = Form.form(Users.class);
	public static Result create() {
		JsonNode reqJson = request().body().asJson();
//		System.err.println("User Json: " + reqJson);
		if (!checkPasswordMatching(reqJson.get(PASSWORD).asText(), reqJson.get(CONFIRM_PASSWORD).asText())) 
			return badRequest("Error in form data");

//		Form<Users> newUserForm = userForm.bindFromRequest();
//		if (newUserForm.hasErrors()) {
//			return badRequest(newUserForm.errorsAsJson());
//		} 
//		checkPasswordMatching(reqJson.get(PASSWORD).asText(), reqJson.get(CONFIRM_PASSWORD).asText());
		Users user = Users.create(reqJson);
//		Users user = newUserForm.get();
		user.save();
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(user));
	}
	
	public static boolean checkPasswordMatching(String password, String confirmPassword) {
		if (password.isEmpty() || confirmPassword.isEmpty())
			return false;
		return password.equals(confirmPassword);
	}

	public static Result update(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(Users.findById(id)));
	}
	
//	public static Result updatePartial(Long id) {
//		JsonNode reqJson = request().body().asJson();
//		System.err.println("\n###############\n" + reqJson);
//		Users user = Users.findById(id);
//		
//		//Check and create query
//		JSONSerializer serializer = new JSONSerializer();
//		JsonNode queryJson = reqJson.get(QueryController.QUERY_TEXT);
//		if (queryJson != null) {
//			return createQuery(user, queryJson, serializer);
//		} else {
//			return ok(serializer.exclude("password").serialize(user.update(reqJson)));
//		}
//	}
	
//	CustomForm<Users> userForm = CustomForm.form(Users.class);
	public static Result updatePartial(Long id) {
		JsonNode reqJson = request().body().asJson();
		System.err.println("\n###############\n" + reqJson);
		Users user = Users.findById(id);
		
		//Check and create query
		JSONSerializer serializer = new JSONSerializer();
//		JsonNode queryJson = reqJson.get(Consts.QUERY_TEXT);
		if (reqJson.has(Consts.QUERY_TEXT)) {
			return createQuery(user, reqJson.get(Consts.QUERY_TEXT), serializer);
		} else if (reqJson.has(PASSWORD) && reqJson.has(CONFIRM_PASSWORD)) {
			return updatePassword(user, reqJson, serializer);
		}
//		if (queryJson != null) {
//			return createQuery(user, queryJson, serializer);
//		} 
		
		return ok(serializer.exclude("password").serialize(user.update(reqJson)));
	}
	
	private static Result updatePassword(Users user, JsonNode reqJson,
		JSONSerializer serializer) {
		String newPassword = reqJson.get(PASSWORD).asText();
		if (!checkPasswordMatching(newPassword, reqJson.get(CONFIRM_PASSWORD).asText())) 
			return badRequest("Passwords do not match!");
		user.updatePassword(newPassword);
		return ok(serializer.include("institution").include("queries").exclude("password").serialize(user));
	}

	public static Result createQuery(Users user, JsonNode queryJson, JSONSerializer serializer) {
		if (user.ownerId == null) 
			return badRequest("Counselor information needed before queries can be created!!");
		if (queryJson.asText() == null || queryJson.asText().isEmpty())
			return badRequest("Incorrect input");
		System.err.println("New query: " + queryJson.asText());
		if (user.addQuery(queryJson.asText()) == null)
			return badRequest("Could not create query!!!");
		return ok(serializer.include("institution").include("queries").exclude("password").serialize(user));
	}
	
	public static Result delete(Long id) {
		JSONSerializer serializer = new JSONSerializer();
//		return ok(serializer.serialize(Users.findById(Long.parseLong(id))));
		return ok(serializer.serialize(Users.findById(id)));
	}
	
	public static Result getLoggedUser() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(Application.getLocalUser()));	
	}
	
	public static Result getAllUsers(){
		JSONSerializer serializer = new JSONSerializer();
		if (Secured.isSuperAdmin() || Secured.isAdmin())
			return ok(serializer.exclude("password").serialize(Users.findAll()));
		else {
			return ok(serializer.exclude("password").serialize(Users.getAllUsersExceptAdmins()));
		}
	}
	
	public static Result getAllStudents(){
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(Users.findAllStudents()));
	}
	
	public static Result getAllCounselors(){
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(Users.findAllCounselors()));
	}

}
