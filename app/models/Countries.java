package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

@Entity
public class Countries extends InfoTables{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static Countries create(String _title) {
		Countries country = new Countries();
		country.title = _title;
		country.createdOn = new Date();
		country.save();
		return country;
	} 
	
	public static Finder<Long, Countries> find = new Finder<Long, Countries>(Long.class, Countries.class);
	
	public static Countries findById(Long id) {
		return find.ref(id);
	}
	
	public static Countries findByTitle(String title) {
		return find.where().eq("title", title).findUnique();
	}
	
	public static List<Countries> findAll() {
		return find.all();
	}

}
