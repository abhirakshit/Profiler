package controllers;

import models.Specializations;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import core.CustomForm;
import flexjson.JSONSerializer;

public class SpecializationsController extends Controller{
	
	public static Result show(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Specializations.findById(id)));
	}
	
	static Form<Specializations> specForm = Form.form(Specializations.class);
	public static Result create() {
		Form<Specializations> form = specForm.bindFromRequest();
		
		if (specForm.hasErrors()) {
			System.err.println(specForm.errorsAsJson());
			return badRequest(specForm.errorsAsJson());
		} 
		Specializations newSpec = form.get();
		newSpec.save();
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(newSpec));
	}
	
	public static Result updatePartial(Long id) {
		Specializations major = Specializations.findById(id);
		JSONSerializer serializer = new JSONSerializer();

		if (major == null)
			return badRequest("No major found for id: " + id);
//		JsonNode json = request().body().asJson();
//		if (json.has(Consts.DEGREES))
//			return updateStreamDegrees(json, major);
		
		CustomForm<Specializations> customSpecForm = CustomForm.form(Specializations.class);
		customSpecForm.bindFromRequest(major);
		major.update();
		return ok(serializer.serialize(major));
	}

	
	public static Result update(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Specializations.findById(id)));
	}
	
	public static Result delete(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Specializations.findById(id)));
	}

	public static Result all() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Specializations.findAll()));
	}


}
