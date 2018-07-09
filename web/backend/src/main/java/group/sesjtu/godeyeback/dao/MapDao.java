package group.sesjtu.godeyeback.dao;

import group.sesjtu.godeyeback.entity.Map;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface MapDao extends MongoRepository<Map, Integer> {
    Map findByName(String name);

    List<Map> findAll();

    Map insert(Map p);

    Map save(Map p);
}
