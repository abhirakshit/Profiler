package models;

import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Institutions extends InfoTables {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
//	@Required
//	@Column(unique = true)
//	public String name;
	
	@Lob
	public String address;
	
	public String website;
	
//	public static final Finder<Long, Institutions> find = new Finder<Long, Institutions>(Long.class, Institutions.class);
//	
//	public Institutions(String _name) {
//		this.name = _name;
//	}
//	
//	public Institutions(String _name, String _address) {
//		this.name = _name;
//		this.address = _address;
//	}
//	
//	public static Institutions create(JsonNode reqJson) {
//		final Institutions newInst = new Institutions(reqJson.get("name").asText(), reqJson.get("address").asText());
//		newInst.save();
//		return newInst;
//	}
//	
//	public static Institutions create(String name, String address) {
//		final Institutions newInst = new Institutions(name, address);
//		newInst.save();
//		return newInst;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "institution")
//	public final Set<Users> users = new HashSet<Users>();
//
//	public Set<Users> getUsers() {
//		return users;
//	}
//
//	public String getAddress() {
//		return address;
//	}
//
//	public void setAddress(String address) {
//		this.address = address;
//	}
//
//	/**
//	 * DB calls
//	 */
//	
//	public static List<Institutions> findAll() {
//		return find.all();
//	}
//	
//	public static Institutions findById(Long id) {
//		return find.ref(id);
//	}
}
