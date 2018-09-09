package group.sesjtu.godeyeback.dao;

import group.sesjtu.godeyeback.entity.Video;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface VideoDao extends MongoRepository<Video, Integer> {
    Video findByName(String name);

    Video insert(Video p);

    long deleteByName(String name);
}
