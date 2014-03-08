package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.codehaus.jackson.JsonNode;

@Entity
public class Schools extends Institutions {

	private static final long serialVersionUID = 1L;
	public static final Finder<Long, Schools> find = new Finder<Long, Schools>(Long.class, Schools.class);

	public Schools(String _title) {
		this.title = _title;
//		this.code = _code;
	}

	public Schools(String _title, String _address) {
		this.title = _title;
//		this.code = _code;
		this.address = _address;
	}

	public static Schools create(JsonNode reqJson) {
		final Schools newInst = new Schools(reqJson.get("title").asText(), reqJson.get("website").asText());
//		final Schools newInst = new Schools(reqJson.get("title").asText());
		newInst.save();
		return newInst;
	}

	public static Schools create(String name, String address) {
		final Schools newInst = new Schools(name, address);
		newInst.save();
		return newInst;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "school")
	public final Set<Users> users = new HashSet<Users>();

	public Set<Users> getUsers() {
		return users;
	}

	/**
	 * DB calls
	 */

	public static List<Schools> findAll() {
		return find.all();
	}

	public static Schools findById(Long id) {
		return find.ref(id);
	}
}
