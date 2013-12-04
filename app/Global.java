import models.Users;
import play.Application;
import play.GlobalSettings;

public class Global extends GlobalSettings {

	public void onStart(Application app) {
		initialData();
	}

	private void initialData() {
		// Create Admin user if not present
		if (Users.findByEmail("admin@admin.com") == null)
			Users.createSuperAdmin("Admin", "", "admin@admin.com", "admin");
	}
}