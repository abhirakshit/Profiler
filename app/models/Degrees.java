package models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;

import play.data.validation.Constraints.Required;

import controllers.Consts;

@Entity
public class Degrees extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	Set<Streams> streams = new HashSet<Streams>();

	@Required
	public String type;
	
	public static final Finder<Long, Degrees> find = new Finder<Long, Degrees>(Long.class, Degrees.class);
	
	public static List<Degrees> findAll() {
		return find.all();
	}
	
	public static Degrees findById(Long id) {
		return find.ref(id);
	}

	public static List<Degrees> findAllBachelors() {
		return find.where().eq("type", Consts.BACHELORS).findList();
	}

	public static List<Degrees> findAllMasters() {
		return find.where().eq("type", Consts.MASTERS).findList();
	}

	public static List<Degrees> findAllDoctorate() {
		return find.where().eq("type", Consts.DOCTORATE).findList();
	}

	public void addStream(Streams stream) {
		if (!streams.contains(stream)) {
			streams.add(stream);
			stream.addDegree(this);
		}
		
	}

	public void removeStream(Streams stream) {
		if (streams.contains(stream)) {
			streams.remove(stream);
			stream.removeDegree(this);
		}
	}
}
