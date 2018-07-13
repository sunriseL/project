package group.sesjtu.godeyeback.service;

import group.sesjtu.godeyeback.dao.MapDao;
import group.sesjtu.godeyeback.entity.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapServiceImpl implements MapService {
    @Autowired
    private MapDao mapRepo;
    private Map currentMap = new Map();

    public void addMap(String name, String bin){
        Map newMap = new Map();
        Map defaultMap = mapRepo.findByName("default");
        newMap.setStr(bin);
        newMap.setName(name);
        mapRepo.save(newMap);
        defaultMap.setStr(bin);
        mapRepo.save(defaultMap);
        System.out.println("add map success"+name);
    }

    public Map getMap(String name){
        return mapRepo.findByName(name);
    }

    public Map getNewestMap(){
        return mapRepo.findByName("default");
    }

    public int hasMap(){
        return Integer.valueOf(String.valueOf(mapRepo.count()));
    }

    public void deleteMap(String name){
        mapRepo.deleteByName(name);
    }

}