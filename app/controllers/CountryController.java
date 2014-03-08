package controllers;

import models.Countries;

import org.codehaus.jackson.JsonNode;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import flexjson.JSONSerializer;

@Security.Authenticated(Secured.class)
public class CountryController extends Controller {
	
	static JSONSerializer serializer = new JSONSerializer();
	
	public static Result show(Long id) {
		return ok(serializer.serialize(Countries.findById(id)));
	}
	
	public static Result create() {
		JsonNode reqJson = request().body().asJson();
		if (!reqJson.has(Consts.TITLE))
			return badRequest("Title missing for country.");
		Countries country = Countries.create(reqJson.get(Consts.TITLE).asText());
		
		return ok(serializer.serialize(country));
	}
	
	
	public static Result update(Long id) {
		return ok(serializer.serialize(null));
	}
	
	public static Result delete(Long id) {
		return ok(serializer.serialize(null));
	}
	
	public static Result getAll() {
		return ok(serializer.serialize(Countries.findAll()));
	}

}
