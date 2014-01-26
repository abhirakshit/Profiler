package core;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.MutablePropertyValues;
import org.springframework.validation.DataBinder;

import play.data.Form;

public class CustomForm<T> extends Form<T>{

	
	public CustomForm(Class<T> clazz) {
		super(clazz);
	}
	
	public static <T> CustomForm<T> form(Class<T> clazz) {
        return new CustomForm<T>(clazz);
    }
	
	public void bindFromRequest(T model, String... allowedFields) {
		bind(model, requestData(play.mvc.Controller.request()), allowedFields);
	}
	
	private void bind(T instance, Map<String, String> data, String... allowedFields) {
		DataBinder dataBinder = null;
		String rootName = name();
	    Map<String, String> objectData = data;
	    if(rootName == null) {
	        dataBinder = new DataBinder(instance);
	    } else {
	        dataBinder = new DataBinder(instance, rootName);
	        objectData = new HashMap<String,String>();
	        for(String key: data.keySet()) {
	            if(key.startsWith(rootName + ".")) {
	                objectData.put(key.substring(rootName.length() + 1), data.get(key));
	            }
	        }
	    }
	    dataBinder.bind(new MutablePropertyValues(objectData));
	}
}
