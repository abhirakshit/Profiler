package models;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

import play.data.format.Formats.NonEmpty;
import play.data.validation.Constraints.Required;

@MappedSuperclass
public abstract class InfoTables extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Required
	@NonEmpty
	@Column(unique = true)
	public String title;
	

//	@Required
//	@Column(unique = true)
//	@NonEmpty
//	public String code;
	
	@Lob
	public String basicInfo;

}
