package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Majors extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Lob
	public String schoolPrep;
	
	@Lob
	public String extraCurricular;
	
	@Lob
	public String admission;
	
	@Lob
	public String careerConnect;
	
	@Lob
	public String salary;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Streams stream;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "major")
	public Set<Specializations> specializations = new HashSet<Specializations>();
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public Set<Colleges> colleges = new HashSet<Colleges>();
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public Set<Occupations> occupations = new HashSet<Occupations>();
	
	public static final Finder<Long, Majors> find = new Finder<Long, Majors>(Long.class, Majors.class);
	
	public static List<Majors> findAll() {
		return find.all();
	}
	
	public static Majors findById(Long id) {
		return find.ref(id);
	}

	public void setStream(Streams stream) {
		this.stream = stream;
	}
	
	public void addSpecialization(Specializations spec) {
		if (!specializations.contains(spec)) {
			specializations.add(spec);
			spec.setMajor(this);
		}
	}

	public void addOccupation(Occupations occupation) {
		if (!occupations.contains(occupation)) {
			occupations.add(occupation);
			occupation.addMajor(this);
		}
	}

}
