package controllers;

import flexjson.JSONSerializer;
import play.mvc.Controller;
import play.mvc.Result;

public class UserController extends Controller{
	
	public static Result getLoggedUser() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.exclude("password").serialize(Application.getLocalUser()));	
	}

}
