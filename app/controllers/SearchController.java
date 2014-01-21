package controllers;

import models.Streams;

import org.codehaus.jackson.JsonNode;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import core.CustomForm;
import flexjson.JSONSerializer;

@Security.Authenticated(Secured.class)
public class SearchController extends Controller{

	// Schools
		public static Result showStream(Long id) {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.include("majors").include("degrees").serialize(Streams.findById(id)));
			
		}
		
		public static Result createStream() {
			JsonNode reqJson = request().body().asJson();
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Streams.create(reqJson)));
		}
		
		public static Result updateStreamPartial(Long id) {
			Streams stream = Streams.findById(id);
			JSONSerializer serializer = new JSONSerializer();

			if (stream == null)
				return badRequest("No such id for stream: " + id);
			JsonNode json = request().body().asJson();
			if (json.has(Consts.DEGREES))
				return updateStreamDegrees(json, stream);
			if (json.has(Consts.MAJOR))
				return updateMajor(json, stream);
			
			CustomForm<Streams> streamForm = CustomForm.form(Streams.class);
			streamForm.bindFromRequest(stream);
			stream.update();
			return ok(serializer.serialize(stream));
		}
		
		private static Result updateMajor(JsonNode json, Streams stream) {
			JSONSerializer serializer = new JSONSerializer();
			JsonNode arr = json.get(Consts.MAJOR);
			stream.updateMajor(arr);
			return ok(serializer.include("majors").include("degrees").serialize(stream));
		}

		public static Result updateStreamDegrees(JsonNode json, Streams stream) {
			JSONSerializer serializer = new JSONSerializer();
			JsonNode arr = json.get(Consts.DEGREES);
//			System.err.println("Degrees: " + arr);
			stream.updateDegrees(arr);
			return ok(serializer.include("majors").include("degrees").serialize(stream));
		}
		
		public static Result updateStream(Long id) {
			Form<Streams> streamForm = Form.form(Streams.class);
			streamForm.bindFromRequest();
			Streams stream = streamForm.get();
			stream.update();
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(stream));
		}
		
		public static Result deleteStream(Long id) {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Streams.findById(id)));
		}
		
		public static Result getAllStreams() {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Streams.findAll()));
		}
		
		public static Result getAllMajors(Long id) {
			JSONSerializer serializer = new JSONSerializer();
			return ok(serializer.serialize(Streams.findById(id).majors));
		}

}
