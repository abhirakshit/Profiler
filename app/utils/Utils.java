package utils;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

public class Utils {
	
	public static String createRandomPassword() {
		SecureRandom random = new SecureRandom();
		byte bytes[] = new byte[20];
	    random.nextBytes(bytes);
	    return String.valueOf(random.nextInt());
	}
	
	public static String getEncryptedPassword(String _password) {
		try {
			return PasswordHash.createHash(_password);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
