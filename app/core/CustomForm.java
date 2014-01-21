package core;

import static play.libs.F.None;
import static play.libs.F.Some;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.ConstraintViolation;

import models.Streams;

import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.NotReadablePropertyException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.DataBinder;
import org.springframework.validation.FieldError;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import play.api.data.FormError;
import play.api.data.Mapping;
import play.data.Form;
import play.data.validation.ValidationError;
import play.db.ebean.Model;
import scala.Option;
import scala.collection.Seq;

public class CustomForm<T> extends Form<T>{

	
	public CustomForm(Class<T> clazz) {
		super(clazz);
		// TODO Auto-generated constructor stub
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

//	@SuppressWarnings("unchecked")
//    public Form<T> bind(Map<String,String> data, Model model) {
//
//        DataBinder dataBinder = null;
//        Map<String, String> objectData = data;
//        if(name() == null) {
//            dataBinder = new DataBinder(model);
//        } else {
//            dataBinder = new DataBinder(model, rootName);
//            objectData = new HashMap<String,String>();
//            for(String key: data.keySet()) {
//                if(key.startsWith(rootName + ".")) {
//                    objectData.put(key.substring(rootName.length() + 1), data.get(key));
//                }
//            }
//        }
//        if(allowedFields.length > 0) {
//            dataBinder.setAllowedFields(allowedFields);
//        }
//        SpringValidatorAdapter validator = new SpringValidatorAdapter(play.data.validation.Validation.getValidator());
//        dataBinder.setValidator(validator);
//        dataBinder.setConversionService(play.data.format.Formatters.conversion);
//        dataBinder.setAutoGrowNestedPaths(true);
//        dataBinder.bind(new MutablePropertyValues(objectData));
//        Set<ConstraintViolation<Object>> validationErrors;
//        if (groups != null) {
//            validationErrors = validator.validate(dataBinder.getTarget(), groups);
//        } else {
//            validationErrors = validator.validate(dataBinder.getTarget());
//        }
//
//        BindingResult result = dataBinder.getBindingResult();
//
//        for (ConstraintViolation<Object> violation : validationErrors) {
//            String field = violation.getPropertyPath().toString();
//            FieldError fieldError = result.getFieldError(field);
//            if (fieldError == null || !fieldError.isBindingFailure()) {
//                try {
//                    result.rejectValue(field,
//                            violation.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName(),
//                            getArgumentsForConstraint(result.getObjectName(), field, violation.getConstraintDescriptor()),
//                            violation.getMessage());
//                }
//                catch (NotReadablePropertyException ex) {
//                    throw new IllegalStateException("JSR-303 validated property '" + field +
//                            "' does not have a corresponding accessor for data binding - " +
//                            "check your DataBinder's configuration (bean property versus direct field access)", ex);
//                }
//            }
//        }
//
//        if(result.hasErrors()) {
//            Map<String,List<ValidationError>> errors = new HashMap<String,List<ValidationError>>();
//            for(FieldError error: result.getFieldErrors()) {
//                String key = error.getObjectName() + "." + error.getField();
//                if(key.startsWith("target.") && rootName == null) {
//                    key = key.substring(7);
//                }
//                List<Object> arguments = new ArrayList<Object>();
//                for(Object arg: error.getArguments()) {
//                    if(!(arg instanceof org.springframework.context.support.DefaultMessageSourceResolvable)) {
//                        arguments.add(arg);
//                    }                    
//                }
//                if(!errors.containsKey(key)) {
//                   errors.put(key, new ArrayList<ValidationError>()); 
//                }
//                errors.get(key).add(new ValidationError(key, error.isBindingFailure() ? "error.invalid" : error.getDefaultMessage(), arguments));                    
//            }
//            return new Form(rootName, backedType, data, errors, None(), groups);
//        } else {
//            Object globalError = null;
//            if(result.getTarget() != null) {
//                try {
//                    java.lang.reflect.Method v = result.getTarget().getClass().getMethod("validate");
//                    globalError = v.invoke(result.getTarget());
//                } catch(NoSuchMethodException e) {
//                } catch(Throwable e) {
//                    throw new RuntimeException(e);
//                }
//            }
//            if(globalError != null) {
//                Map<String,List<ValidationError>> errors = new HashMap<String,List<ValidationError>>();
//                if(globalError instanceof String) {
//                    errors.put("", new ArrayList<ValidationError>());
//                    errors.get("").add(new ValidationError("", (String)globalError, new ArrayList()));
//                } else if(globalError instanceof List) {
//                    for (ValidationError error : (List<ValidationError>) globalError) {
//                      List<ValidationError> errorsForKey = errors.get(error.key());
//                      if (errorsForKey == null) {
//                        errors.put(error.key(), errorsForKey = new ArrayList<ValidationError>());
//                      }
//                      errorsForKey.add(error);
//                    }
//                } else if(globalError instanceof Map) {
//                    errors = (Map<String,List<ValidationError>>)globalError;
//                }
//                return new Form(rootName, backedType, data, errors, None(), groups);
//            }
//            return new Form(rootName, backedType, new HashMap<String,String>(data), new HashMap<String,List<ValidationError>>(errors), Some((T)result.getTarget()), groups);
//        }
//    }

	
}
