package controllers;

import models.Occupations;
import core.CustomForm;
import flexjson.JSONSerializer;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;

public class OccupationsController extends Controller {
	
	public static Result show(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Occupations.findById(id)));
	}
	
	static Form<Occupations> occupForm = Form.form(Occupations.class);
	public static Result create() {
		Form<Occupations> form = occupForm.bindFromRequest();
		
		if (occupForm.hasErrors()) {
			System.err.println(occupForm.errorsAsJson());
			return badRequest(occupForm.errorsAsJson());
		} 
		Occupations newOccup = form.get();
		newOccup.save();
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(newOccup));
	}
	
	public static Result updatePartial(Long id) {
		Occupations major = Occupations.findById(id);
		JSONSerializer serializer = new JSONSerializer();

		if (major == null)
			return badRequest("No major found for id: " + id);
//		JsonNode json = request().body().asJson();
//		if (json.has(Consts.DEGREES))
//			return updateStreamDegrees(json, major);
		
		CustomForm<Occupations> customOccupForm = CustomForm.form(Occupations.class);
		customOccupForm.bindFromRequest(major);
		major.update();
		return ok(serializer.serialize(major));
	}

	
	public static Result update(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Occupations.findById(id)));
	}
	
	public static Result delete(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Occupations.findById(id)));
	}

	public static Result all() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Occupations.findAll()));
	}


}
