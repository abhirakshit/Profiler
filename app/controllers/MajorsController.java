package controllers;

import net.sf.ehcache.hibernate.HibernateUtil;

import org.codehaus.jackson.JsonNode;

import models.Colleges;
import models.Majors;
import models.Occupations;
import models.Specializations;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Http.Session;
import play.mvc.Result;
import core.CustomForm;
import flexjson.JSONSerializer;

public class MajorsController extends Controller{
	
	public static Result show(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.include(Consts.SPECIALIZATIONS).include(Consts.OCCUPATIONS).
				include(Consts.COLLEGES).serialize(Majors.findById(id)));
	}
	
	static Form<Majors> majorForm = Form.form(Majors.class);
	public static Result create() {
		Form<Majors> form = majorForm.bindFromRequest();
		
		if (majorForm.hasErrors()) {
			System.err.println(majorForm.errorsAsJson());
			return badRequest(majorForm.errorsAsJson());
		} 
		Majors newMajor = form.get();
		newMajor.save();
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.include(Consts.SPECIALIZATIONS).include(Consts.OCCUPATIONS).
				include(Consts.COLLEGES).serialize(newMajor));
	}
	
	public static Result updatePartial(Long id) {
//		Majors major = Majors.findById(id);
		Majors major = Majors.findEagerlyById(id);
		
		JSONSerializer serializer = new JSONSerializer();

		
		if (major == null)
			return badRequest("No major found for id: " + id);
		JsonNode json = request().body().asJson();
		if (json.has(Consts.SPEC_TITLE))
			return addSpecialization(json, major, serializer);
		if (json.has(Consts.ADD_OCCUPATION))
			return addOccupation(json, major, serializer);
		if (json.has(Consts.ADD_COLLEGE))
			return addCollege(json, major, serializer);
		
		CustomForm<Majors> majorForm = CustomForm.form(Majors.class);
		majorForm.bindFromRequest(major);
		major.update();
		return ok(serializer.include(Consts.SPECIALIZATIONS).include(Consts.OCCUPATIONS).
				include(Consts.COLLEGES).serialize(major));
	}
	
	private static Result addCollege(JsonNode json, Majors major,
			JSONSerializer serializer) {
		Long collegeId = json.get(Consts.ADD_COLLEGE).asLong();
		Colleges college = Colleges.findById(collegeId);
		
		major.addCollege(college);
		//major.update();
		major.save();
		return ok(serializer.include(Consts.SPECIALIZATIONS).include(Consts.OCCUPATIONS).
				include(Consts.COLLEGES).serialize(major));
	}

	private static Result addOccupation(JsonNode json, Majors major,
			JSONSerializer serializer) {
		Long occupId = json.get(Consts.ADD_OCCUPATION).asLong();
		
		Occupations occupation = Occupations.findById(occupId);
		
		major.addOccupation(occupation);
		major.update();
		return ok(serializer.include(Consts.SPECIALIZATIONS).include(Consts.OCCUPATIONS).
				include(Consts.COLLEGES).serialize(major));
	}

	private static Result addSpecialization(JsonNode json, Majors major, JSONSerializer serializer) {
		// Create Spec
		String specTitle = json.get(Consts.SPEC_TITLE).asText();
		System.err.println("Spec: " + specTitle);
		Specializations spec = new Specializations(specTitle);
		spec.save();
		
		major.addSpecialization(spec);
		spec.update();
		major.update();
		return ok(serializer.include(Consts.SPECIALIZATIONS).include(Consts.OCCUPATIONS).
				include(Consts.COLLEGES).serialize(major));
	}

	
	public static Result update(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Majors.findById(id)));
	}
	
	public static Result delete(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Majors.findById(id)));
	}

	public static Result all() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Majors.findAll()));
	}


}
