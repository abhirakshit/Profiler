package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.codehaus.jackson.JsonNode;

@Entity
public class Universities extends Institutions {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "university")
	public Set<Colleges> colleges = new HashSet<Colleges>();

	
	public static final Finder<Long, Universities> find = new Finder<Long, Universities>(Long.class, Universities.class);
	
	public Universities(String _title, String _address) {
		this.title = _title;
		this.address = _address;
	}


	public static Universities create(JsonNode reqJson) {
		final Universities newUniv = new Universities(reqJson.get("title").asText(),
				reqJson.get("address").asText());
		newUniv.save();
		return newUniv;
	}
	
	
	/**
	 * DB calls
	 */

	public static List<Universities> findAll() {
		return find.all();
	}

	public static Universities findById(Long id) {
		return find.ref(id);
	}
}
