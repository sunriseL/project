package group.sesjtu.godeyeback.service;

import group.sesjtu.godeyeback.dao.MapDao;
import group.sesjtu.godeyeback.entity.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MapServiceImpl implements MapService {
    @Autowired
    private MapDao mapRepo;
    private Logger log = LogManager.getLogger(MapServiceImpl.class.getName());

    public void addMap(String name, String bin){
        Map newMap = new Map();
        Map defaultMap = mapRepo.findByName("default");
        newMap.setStr(bin);
        newMap.setName(name);
        try{
            mapRepo.save(newMap);
            defaultMap.setStr(bin);
            mapRepo.save(defaultMap);
            log.info("Add a new map named "+name);
        }catch(Exception e){
            log.error(e);
        }
    }

    public Map getMap(String name){
        log.info("Get the map named "+name);
        return mapRepo.findByName(name);
    }

    public Map getNewestMap(){
        log.info("Get the default map");
        return mapRepo.findByName("default");
    }

    public int hasMap(){
        return Integer.valueOf(String.valueOf(mapRepo.count()));
    }

    public void deleteMap(String name){
        try{
            log.info("Delete the map named "+name);
            mapRepo.deleteByName(name);
        }catch(Exception e){
            log.error(e);
        }
    }

}