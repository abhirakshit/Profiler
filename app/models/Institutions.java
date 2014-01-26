package models;

import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Institutions extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Lob
	public String address;
	
	public String website;
	
}
