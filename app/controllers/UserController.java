package controllers;

import models.Users;
import flexjson.JSONSerializer;
import play.mvc.Controller;
import play.mvc.Result;

public class UserController extends Controller{
	
	
	public static Result show(String id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Users.findById(Long.parseLong(id))));	
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
		return ok(serializer.exclude("password").serialize(Application.getLocalUser()));
	}
	
	public static Result getAllCounselors(){
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(Application.getLocalUser()));
	}

}
