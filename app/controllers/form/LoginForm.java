package controllers.form;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import models.Users;
import play.data.validation.Constraints.Required;

public class LoginForm {

	@Required
	public String password;
	@Required
	public String email;
	
	public String validate() {
        try {
			if (!Users.authenticate(email, password)) {
			    return "Invalid user or password";
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
        return null;
    }
	
}
