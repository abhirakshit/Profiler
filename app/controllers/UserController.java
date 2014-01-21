package controllers;

import models.Users;

import org.codehaus.jackson.JsonNode;

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
	
	public static Result create() {
		JsonNode reqJson = request().body().asJson();
		if (reqJson != null &&
				(reqJson.get(PASSWORD) != null || !reqJson.get(PASSWORD).asText().isEmpty()) ||
				(reqJson.get(CONFIRM_PASSWORD) != null || !reqJson.get(CONFIRM_PASSWORD).asText().isEmpty()) ||
				!checkPasswordMatching(reqJson.get(PASSWORD).asText(), reqJson.get(CONFIRM_PASSWORD).asText())
				) 
			return badRequest();
//		checkPasswordMatching(reqJson.get(PASSWORD).asText(), reqJson.get(CONFIRM_PASSWORD).asText());
		Users user = Users.create(reqJson);
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(user));
	}
	
	public static boolean checkPasswordMatching(String password, String confirmPassword) {
		return password.equals(confirmPassword);
	}

	public static Result update(Long id) {
//		System.err.println("\n$$$$$$$$$$$$$$$$\n" + request().body().asJson());
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Users.findById(id)));
	}
	
	public static Result updatePartial(Long id) {
		JsonNode reqJson = request().body().asJson();
		System.err.println("\n###############\n" + reqJson);
		Users user = Users.findById(id);
		
		//Check and create query
		JSONSerializer serializer = new JSONSerializer();
		JsonNode queryJson = reqJson.get(QueryController.QUERY_TEXT);
		if (queryJson != null) {
			return createQuery(user, queryJson, serializer);
		} else {
			return ok(serializer.serialize(user.update(reqJson)));
		}
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
