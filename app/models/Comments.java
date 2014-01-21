package models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class Comments extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Lob
	public String comment;
	
	public Long creatorId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Queries query;
	
	public static Comments create(Long creatorId, String comment) {
		Comments commentObj = new Comments();
		commentObj.comment = comment;
		commentObj.creatorId = creatorId;
		commentObj.save();
		return commentObj;
	}
	
	public void setQuery(Queries _query) {
		this.query = _query;
		if (!this.query.comments.contains(this))
			this.query.comments.add(this);
	}

}
