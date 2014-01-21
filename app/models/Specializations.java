package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Entity
public class Specializations extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Majors major;
	
	public static final Finder<Long, Specializations> find = new Finder<Long, Specializations>(Long.class, Specializations.class);
	
	public Specializations(String _title) {
		this.title = _title;
	}

	public static List<Specializations> findAll() {
		return find.all();
	}
	
	public static Specializations findById(Long id) {
		return find.ref(id);
	}

	public void setMajor(Majors major) {
		this.major = major;
	}

}
