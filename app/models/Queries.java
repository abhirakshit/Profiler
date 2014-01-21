package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import controllers.Application;

@Entity
public class Queries extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Users creator;
	
	public Long assignedTo;
	
	@Lob
	public String queryStr;
	
	public String status = Application.STATUS_NEW;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "query")
	public final Set<Comments> comments = new HashSet<Comments>();
	
	public static final Finder<Long, Queries> find = new Finder<Long, Queries>(Long.class, Queries.class);

	
	public static Queries create(String _query, Long _assignedTo) {
		if (_query == null || _query.isEmpty() || _assignedTo == null)
			return null;
		Queries query = new Queries();
		query.queryStr = _query;
		query.assignedTo = _assignedTo;
		return query;
	}
	
	public void addCreator(Users creator) {
		this.creator = creator;
	}
	
	public void addComment(Comments comment) {
		this.comments.add(comment);
		if (comment.query != this)
			comment.setQuery(this);
	}
	
	//DB calls
	
	/**
	 * DB calls
	 */
	
	public static List<Queries> findAll() {
		return find.all();
	}
	
	public static Queries findById(Long id) {
		return find.ref(id);
	}

}
