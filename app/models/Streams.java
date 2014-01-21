package models;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.codehaus.jackson.JsonNode;

@Entity
public class Streams extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Lob
	public String skills;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "stream")
	public Set<Majors> majors = new HashSet<Majors>();
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public Set<Degrees> degrees = new HashSet<Degrees>();
	
	public static final Finder<Long, Streams> find = new Finder<Long, Streams>(Long.class, Streams.class);

	public Streams(String _title) {
		this.title = _title;
	}

	public static List<Streams> findAll() {
		return find.all();
	}
	
	public static Streams findById(Long id) {
		return find.ref(id);
	}

	public static Streams create(JsonNode reqJson) {
		Streams stream = new Streams(reqJson.get("title").asText());
		stream.save();
		return stream;
	}
	
	public Streams update(JsonNode data) {
		Iterator<String> fields = data.getFieldNames();
		while (fields.hasNext()) {
			String property = fields.next();
			String value = data.get(property).asText();
			saveValueForProperty(property, value);
		}
		this.update();
		this.modifiedToday();
		return this;
	}

	private void saveValueForProperty(String property, String value) {
		if (property.equals("basicInfo")) {
			this.basicInfo = value;
		} else if(property.equals("skills")) {
			this.skills = value;
		}
	}

	public void updateDegrees(JsonNode degreeIdArray) {
		if (degreeIdArray.isArray()) {
			Set<Degrees> degreesCopy = new HashSet<Degrees>(degrees);
			//Remove all
			for (Degrees degree: degreesCopy) {
				removeDegree(degree);
			}
			
			//Add all new ones
			for (JsonNode degreeId: degreeIdArray) {
				addDegree(Degrees.findById(degreeId.asLong()));
			}
		}
		this.update();
	}
	
	public void addDegree(Degrees degree) {
		if (!degrees.contains(degree)) {
			degrees.add(degree);
			degree.addStream(this);
		}
	}
	
	public void removeDegree(Degrees degree) {
		if (degrees.contains(degree)) {
			degrees.remove(degree);
			degree.removeStream(this);
		}
	}

	public void updateMajor(JsonNode arr) {
		Majors major = Majors.findById(arr.asLong());
		addMajor(major);
		update();
	}
	
	public void addMajor(Majors major) {
		if (!majors.contains(major)) {
			majors.add(major);
			major.setStream(this);
		}
	}
	
	public void remove(Majors major) {
		if (majors.contains(major)) {
			majors.remove(major);
//			major.removeStream(this);
		}
	}

}
