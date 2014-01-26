package controllers;

import models.Colleges;
import models.Schools;
import models.Universities;

import org.codehaus.jackson.JsonNode;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import flexjson.JSONSerializer;

@Security.Authenticated(Secured.class)
public class InstitutionController extends Controller{
	
	// Schools
	public static Result showSchool(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Schools.findById(id)));
	}
	
	public static Result createSchool() {

		//Only for populating directly
//		Map<String, String[]> reqMap = request().body().asFormUrlEncoded();
//		Institutions inst = Institutions.create(reqMap.get("name")[0], reqMap.get("address")[0]);
		
		
		JsonNode reqJson = request().body().asJson();
		Schools school = Schools.create(reqJson);
		
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(school));
	}
	
	public static Result updateSchool(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Schools.findById(id)));
	}
	
	public static Result deleteSchool(Long id) {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Schools.findById(id)));
	}
	
	public static Result getAllSchools() {
		JSONSerializer serializer = new JSONSerializer();
		return ok(serializer.serialize(Schools.findAll()));
	}

	
	
	
	/**
	 *  Colleges
	 */

	public static Result showCollege(Long id) {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Colleges.findById(id)));
		}
		
		static Form<Colleges> collegeForm = Form.form(Colleges.class);
		public static Result createCollege() {

			Form<Colleges> form = collegeForm.bindFromRequest();
			if (form.hasErrors()) {
				return badRequest(form.errorsAsJson());
			}
//			JsonNode reqJson = request().body().asJson();
//			Colleges college = Colleges.create(reqJson);
			
			Colleges college = form.get();
			college.save();
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(college));
		}
		
		public static Result updateCollege(Long id) {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Colleges.findById(id)));
		}
		
		public static Result deleteCollege(Long id) {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Colleges.findById(id)));
		}
		
		public static Result getAllColleges() {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Colleges.findAll()));
		}

		
		/**
		 *  Universities
		 */

		public static Result showUniversity(Long id) {
				JSONSerializer serializer = new JSONSerializer();
				return ok(serializer.serialize(Universities.findById(id)));
			}
			
			public static Result createUniversity() {

				//Only for populating directly
//				Map<String, String[]> reqMap = request().body().asFormUrlEncoded();
//				Institutions inst = Institutions.create(reqMap.get("name")[0], reqMap.get("address")[0]);
				
				
				JsonNode reqJson = request().body().asJson();
				Universities college = Universities.create(reqJson);
				
				JSONSerializer serializer = new JSONSerializer();
				return ok(serializer.serialize(college));
			}
			
			public static Result updateUniversity(Long id) {
				JSONSerializer serializer = new JSONSerializer();
				return ok(serializer.serialize(Universities.findById(id)));
			}
			
			public static Result deleteUniversity(Long id) {
				JSONSerializer serializer = new JSONSerializer();
				return ok(serializer.serialize(Universities.findById(id)));
			}
			
			public static Result getAllUniversities() {
				JSONSerializer serializer = new JSONSerializer();
				return ok(serializer.serialize(Universities.findAll()));
			}

}
