package persistance;

import hibernate.HibernateUtil;

import java.util.ArrayList;
import java.util.List;

import model.GEOJSONFile;

import org.hibernate.criterion.DetachedCriteria;

public class GEOJSONFileDAO {
	// a. GEOJSONFile class method: C R U D
	public static ArrayList<GEOJSONFile> getAllGEOJSONFiles() {
		ArrayList<GEOJSONFile> geoJsonFiles = new ArrayList<GEOJSONFile>();
		DetachedCriteria dc = DetachedCriteria.forClass(GEOJSONFile.class);
		List<Object> list = HibernateUtil.detachedCriteriaReturnList(dc);
		for (Object o : list) {
			geoJsonFiles.add((GEOJSONFile) o);
		}
		return geoJsonFiles;
	}

	public static GEOJSONFile getGEOJSONFileById(long id) {
		return (GEOJSONFile) HibernateUtil.get(GEOJSONFile.class, id);
	}

	public static void addGEOJSONFile(GEOJSONFile geoJsonFile) {
		HibernateUtil.save(geoJsonFile);
	}

	public static void modifyGEOJSONFile(GEOJSONFile modifiedGEOJSONFile) {
		HibernateUtil.update(modifiedGEOJSONFile);
	}

	public static void deleteGEOJSONFile(GEOJSONFile geoJsonFile) {
		HibernateUtil.delete(geoJsonFile);
	}
	
}
