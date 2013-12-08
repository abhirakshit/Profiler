package models;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.persistence.Column;
import javax.persistence.Entity;

import play.data.validation.Constraints.Required;

import utils.PasswordHash;
import utils.StringUtils;
import utils.Utils;

import com.avaje.ebean.validation.Email;

import controllers.Application;

@Entity
public class Users extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Required
	@Email
	@Column(unique = true)
	public String email;

	@Required
	public String firstName;
	
	public String lastName;
	
	@Required
	public String password;
	
	@Required
	public String roleType;

	public boolean active = true;

	public static final Finder<Long, Users> find = new Finder<Long, Users>(Long.class, Users.class);

	
	public Users(String _firstName, String _lastName, String _email, String _password, String _roleType) {
		firstName = StringUtils.properCase(_firstName);
		lastName = StringUtils.properCase(_lastName);
		email = _email.toLowerCase();
		password = Utils.getEncryptedPassword(_password);
		roleType = _roleType;
	}
	
	public Users(String _firstName, String _lastName, String _email, String _roleType) {
		firstName = StringUtils.properCase(_firstName);
		lastName = StringUtils.properCase(_lastName);
		email = _email.toLowerCase();
		password = Utils.getEncryptedPassword(Utils.createRandomPassword());
		roleType = _roleType;
	}
	
	public static Users createSuperAdmin(String _firstName, String _lastName, String _email, String _password) {
		final Users user = new Users(_firstName, _lastName, _email, _password, Application.SUPER_ADMIN);
		user.active = true;
		user.save();
		return user;
	}
	
	
	public String getFullName() {
		return (firstName + " " + lastName).trim();
	}
	
	/**
	 * DB calls
	 */
	public static Users findByEmail(final String email) {
		if (email == null || email.isEmpty())
			return null;
		return find.where().eq("active", true).eq("email", email.toLowerCase()).findUnique();
	}
	
	/**
     * Authenticate a User.
	 * @throws InvalidKeySpecException 
	 * @throws NoSuchAlgorithmException 
     */
    public static boolean authenticate(String email, String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
    	Users user = find.where()
			        .eq("email", email.toLowerCase())
			        .findUnique();
    	if (user == null)
    		return false;
        return PasswordHash.validatePassword(password, user.password);
    }
	
}
