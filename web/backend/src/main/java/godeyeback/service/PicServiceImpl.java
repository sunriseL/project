package godeyeback.service;

import godeyeback.dao.PictureDao;

import godeyeback.entity.Picture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PicServiceImpl implements PicService {
    @Autowired
    private PictureDao picRepo;

    public void addPicture(String name,String bin){
        Picture p = new Picture();
        p.setStr(bin);
        p.setName(name);
        picRepo.insert(p);
        System.out.println("insert picture success");
    }

    public String getPicture(String name){
        return picRepo.findByName(name).getStr();
    }

}