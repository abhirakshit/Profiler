package controllers;

import models.Queries;
import models.Users;

import org.codehaus.jackson.JsonNode;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import flexjson.JSONSerializer;

@Security.Authenticated(Secured.class)
public class QueryController extends Controller{

//	public static String QUERY_TEXT = "queryText";
	public static Result show(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Queries.findById(id)));
	}
	
	public static Result create() {
		JsonNode reqJson = request().body().asJson();
		JsonNode queryJson = reqJson.get(Consts.QUERY_TEXT);
		if (queryJson == null || queryJson.asText() == null || queryJson.asText().isEmpty())
			return badRequest("Incorrect input");

		Users user = Application.getLocalUser();
		if (user.ownerId == null) 
			return badRequest("Counselor information needed before queries can be created!!");
//		System.err.println(queryJson.asText());
		Queries query = user.addQuery(queryJson.asText());
		if (query == null)
			return badRequest("Could not create query!!!");
		
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(query));
	}
	
	
	public static Result update(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(null));
	}
	
	public static Result delete(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(null));
	}

}
