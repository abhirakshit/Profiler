import models.Users;
import play.Application;
import play.GlobalSettings;

public class Global extends GlobalSettings {

	public void onStart(Application app) {
		initialData();
	}

	private void initialData() {
		// Create Admin user if not present
		if (Users.findByEmail("admin@admin.com") == null) {
			Users.createAdmin("Admin", "", "admin@admin.com", "admin");
		}

		if (Users.findByEmail("shirish.g@mnemoniceducation.com") == null) {
			Users.createAdmin("Shirish", "Gupta", "shirish.g@mnemoniceducation.com", "shirishG");
		}
	}
}