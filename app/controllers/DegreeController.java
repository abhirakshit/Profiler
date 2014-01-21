package controllers;

import models.Degrees;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import flexjson.JSONSerializer;

@Security.Authenticated(Secured.class)
public class DegreeController extends Controller{
	
	public static Result show(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Degrees.findById(id)));
	}
	
	static Form<Degrees> degreeForm = Form.form(Degrees.class);
	public static Result create() {
//		JsonNode json = request().body().asJson();
//		System.err.println(json);
		Form<Degrees> form = degreeForm.bindFromRequest();
		
		if (degreeForm.hasErrors()) {
			System.err.println(degreeForm.errorsAsJson());
			return badRequest(degreeForm.errorsAsJson());
		} 
		Degrees newDegree = form.get();
		newDegree.save();
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(newDegree));
	}
	
	public static Result update(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Degrees.findById(id)));
	}
	
	public static Result delete(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Degrees.findById(id)));
	}

	public static Result all() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Degrees.findAll()));
	}
	
	public static Result allBachelors() {
		JSONSerializer serializer = new JSONSerializer();
//		System.err.println("B Size: " + Degrees.findAllBachelors().size());
		return ok(serializer.serialize(Degrees.findAllBachelors()));
	}
	
	public static Result allMasters() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Degrees.findAllMasters()));
	}
	
	public static Result allDoctorate() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Degrees.findAllDoctorate()));
	}
}
