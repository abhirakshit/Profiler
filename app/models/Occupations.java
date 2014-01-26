package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;

@Entity
public class Occupations extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "occupations")
	public Set<Majors> majors = new HashSet<Majors>();
	
	public static final Finder<Long, Occupations> find = new Finder<Long, Occupations>(Long.class, Occupations.class);
	
	public static List<Occupations> findAll() {
		return find.all();
	}
	
	public static Occupations findById(Long id) {
		return find.ref(id);
	}

	public void addMajor(Majors major) {
		if (!majors.contains(major)) {
			majors.add(major);
			major.addOccupation(this);
		}
	}

}
