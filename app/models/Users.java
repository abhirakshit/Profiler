package models;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.codehaus.jackson.JsonNode;

import play.data.validation.Constraints.Required;
import utils.PasswordHash;
import utils.StringUtils;
import utils.Utils;

import com.avaje.ebean.validation.Email;

import controllers.Application;
import controllers.form.SignupForm;

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
	
	public Long ownerId; //Counselor Id
	
	//Profile Attributes for Students
	public String contactNumber;
	
	@Lob
	public String address;
	
	public String fieldInterested;
	
	public String countryInterested;
	
	public String programInterested;

	//X
	public String highSchoolScore;
	
	//X+2
	public String seniorSecondaryScore;
	
	public String graduationScore;
	
	public String sat;
	
	public String toefl;
	
	public String ielts;
	
	public String gre;
	
	public String gmat;
	
	@Lob
	public String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	public Schools school;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "creator")
	public final Set<Queries> queries = new HashSet<Queries>();


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

	public static Users create(JsonNode json) {
		final Users user = new Users(json.get("firstName").asText(), json.get("lastName").asText(), 
				json.get("email").asText(), json.get("password").asText(), json.get("roleType").asText());
		user.active = true;
		user.save();
		return user;
	}
	
	public static Users create(SignupForm completedForm) {
		final Users user = new Users(completedForm.firstName, completedForm.lastName, 
				completedForm.email, completedForm.passwd, completedForm.roleType);
		user.active = true;
		user.save();
		return user;
	}
	
	public static Users createAdmin(String _firstName, String _lastName, String _email, String _password) {
		final Users user = new Users(_firstName, _lastName, _email, _password, Application.ADMIN);
		user.active = true;
		user.save();
		return user;
	}
	
	public static Users createSuperAdmin(String _firstName, String _lastName, String _email, String _password) {
		final Users user = new Users(_firstName, _lastName, _email, _password, Application.SUPER_ADMIN);
		user.active = true;
		user.save();
		return user;
	}
	
	public void updatePassword(String newPassword) {
		this.password = Utils.getEncryptedPassword(newPassword);
		update();
	}
	
	public Users update(JsonNode data) {
		Iterator<String> fields = data.getFieldNames();
		while (fields.hasNext()) {
			String property = fields.next();
			String value = data.get(property).asText();
			saveValueForProperty(property, value);
		}
		this.update();
		return this;
	}
	
	private void saveValueForProperty(String property, String value) {
		if ("schoolId".equals(property)) {
			setSchool(Schools.findById(Long.parseLong(value)));
		} else if ("ownerId".equals(property)) {
			this.ownerId = Long.parseLong(value);
		} else if ("countryInterested".equals(property)) {
			this.countryInterested = value;
		} else if ("highSchoolScore".equals(property)) {
			this.highSchoolScore = value;
		} else if ("seniorSecondaryScore".equals(property)) {
			this.seniorSecondaryScore = value;
		} else if ("fieldInterested".equals(property)) {
			this.fieldInterested = value;
		} else if ("programInterested".equals(property)) {
			this.programInterested = value;
		} else if ("remarks".equals(property)) {
			this.remarks = value;
		} else if ("gre".equals(property)) {
			this.gre = value;
		} else if ("toefl".equals(property)) {
			this.toefl = value;
		} else if ("sat".equals(property)) {
			this.sat = value;
		} else if ("gmat".equals(property)) {
			this.gmat = value;
		} else if ("ielts".equals(property)) {
			this.ielts = value;
		} 
	}

	//Institutions
	public void setSchool(Schools _school)  {
		this.school = _school;
		if (!school.getUsers().contains(this))
			school.getUsers().add(this);
	}

	public Queries addQuery(String queryStr) {
		Queries query = Queries.create(queryStr, ownerId);
		if (!this.queries.contains(query)) {
			query.addCreator(this);
			query.save();
			queries.add(query);
			return query;
		} else {
			System.err.println("Duplicate query: " + queryStr);
			return null;
		}
		
	}
	
	//Utils
	public String getFullName() {
		return (firstName + " " + lastName).trim();
	}
	
	/**
	 * DB calls
	 */
	
	public static List<Users> findAll() {
		return find.all();
	}
	
	public static Users findByEmail(final String email) {
		if (email == null || email.isEmpty())
			return null;
		return find.where().eq("active", true).eq("email", email.toLowerCase()).findUnique();
	}
	
	public static Users findById(Long id) {
		return find.ref(id);
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

	public static List<Users> getAllUsersExceptAdmins() {
		return find.where().ne("roleType", Application.ADMIN)
				.ne("roleType", Application.SUPER_ADMIN).findList();
	}
	
	public static List<Users> findAllStudents() {
		return find.where().eq("roleType", Application.STUDENT)
				.findList();
	}
	
	public static List<Users> findAllCounselors() {
		return find.where().eq("roleType", Application.COUNSELOR)
				.findList();
	}
	
	public static List<Users> findAssignedStudentsById(Long id) {
		return find.where().eq("ownerId", id).findList();
	}

}
