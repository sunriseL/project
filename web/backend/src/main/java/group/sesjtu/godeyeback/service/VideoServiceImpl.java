package group.sesjtu.godeyeback.service;

import group.sesjtu.godeyeback.dao.VideoDao;

import group.sesjtu.godeyeback.entity.Video;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VideoServiceImpl implements VideoService {
    @Autowired
    private VideoDao videoRepo;
    private Logger log = LogManager.getLogger(MapServiceImpl.class.getName());

    public void addVideo(String name, String bin){
        Video v = new Video();
        v.setStr(bin);
        v.setName(name);
        videoRepo.insert(v);
        log.info("Add video named "+name);
    }

    public String getVideo(String name){
        log.info("Get video named "+name);
        return videoRepo.findByName(name).getStr();
    }

    public long deleteVideo(String name){
        log.info("Delete video named "+name);
        return videoRepo.deleteByName(name);
    }

}