package godeyeback.dao;

import godeyeback.entity.Picture;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


public interface PictureDao extends MongoRepository<Picture, Integer> {
    Picture findByName(String name);

    Picture insert(Picture p);
}
