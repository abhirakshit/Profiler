package models;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import play.data.format.Formats;
import play.db.ebean.Model;

@MappedSuperclass	
public class Base extends Model{
	
	private static final long serialVersionUID = 1L;

	@Id
	public Long id;
	
	@Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date createdOn;
	
	@Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date modifiedOn;
	
	public Base() {
		createdOn = new Date();
		modifiedOn = createdOn;
	}
	
	public void modifiedToday(){
		modifiedOn = new Date();
	}

}
