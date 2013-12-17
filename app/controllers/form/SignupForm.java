package controllers.form;

import play.data.validation.Constraints.Email;
import play.data.validation.Constraints.Required;

public class SignupForm {

	@Required
	public String firstName;
	
	@Required
	public String lastName;
	
	@Required
	@Email
	public String email;
	
	@Required
	public String passwd;
	
	@Required
	public String confirmPasswd;
	
	@Required
	public String roleType;
	
	public String validate() {
//		try {
//			if (!Users.authenticate(email, password)) {
//			    return "Invalid user or password";
//			}
			
			if (!passwd.equals(confirmPasswd))
				return "Passwords don't match";
//		} 
        return null;
	}
	
}
