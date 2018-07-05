package group.sesjtu.godeyeback.service;

import group.sesjtu.godeyeback.dao.VideoDao;

import group.sesjtu.godeyeback.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoServiceImpl implements VideoService {
    @Autowired
    private VideoDao videoRepo;

    public void addVideo(String name, String bin){
        Video v = new Video();
        v.setStr(bin);
        v.setName(name);
        videoRepo.insert(v);
        System.out.println("add video success");
    }

    public String getVideo(String name){
        return videoRepo.findByName(name).getStr();
    }

}