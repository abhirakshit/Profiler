package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.codehaus.jackson.JsonNode;

@Entity
public class Colleges extends Institutions {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Universities university;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public Set<Majors> majors = new HashSet<Majors>();
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "college")
	public Set<Departments> departments = new HashSet<Departments>();
	
	public static final Finder<Long, Colleges> find = new Finder<Long, Colleges>(Long.class, Colleges.class);
	
	public Colleges(String _title, String _address) {
		this.title = _title;
		this.address = _address;
	}


	public static Colleges create(JsonNode reqJson) {
		final Colleges newCollege = new Colleges(reqJson.get("title").asText(),
				reqJson.get("address").asText());
		newCollege.save();
		return newCollege;
	}
	
	
	/**
	 * DB calls
	 */

	public static List<Colleges> findAll() {
		return find.all();
	}

	public static Colleges findById(Long id) {
		return find.ref(id);
	}


	public void addMajor(Majors major) {
		if (!majors.contains(major)) {
			majors.add(major);
			major.addCollege(this);
		}
	}
}
