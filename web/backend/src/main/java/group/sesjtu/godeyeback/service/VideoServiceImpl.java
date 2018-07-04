package group.sesjtu.godeyeback.service;

import group.sesjtu.godeyeback.dao.VideoDao;

import group.sesjtu.godeyeback.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoServiceImpl implements VideoService {
    @Autowired
    private VideoDao picRepo;

    public void addPicture(String name,String bin){
        Video p = new Video();
        p.setStr(bin);
        p.setName(name);
        picRepo.insert(p);
        System.out.println("insert picture success");
    }

    public String getPicture(String name){
        return picRepo.findByName(name).getStr();
    }

}