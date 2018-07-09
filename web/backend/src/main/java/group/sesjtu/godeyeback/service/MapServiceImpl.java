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

    public void setRoad(String name, int x,int y){
        currentMap = mapRepo.findByName(name);
        currentMap.setOne(x,y);
        mapRepo.save(currentMap);
        System.out.println(currentMap.getPoint(x,y));
    }

    public int get(String name, int x,int y){
        currentMap = mapRepo.findByName(name);
        showMap(name,x,y);
        return currentMap.getPoint(x,y);
    }

    public int showMap(String name, int x,int y){
        currentMap = mapRepo.findByName(name);
        for(int j = 0;j < 4;j++) {
            for (int i = 0; i < 3; i++) {
                System.out.print(currentMap.getPoint(j,i));
            }
            System.out.println("");
        }
        return currentMap.getPoint(x,y);
    }

    public void addMap(String name, String bin){
        Map newMap = new Map();
        newMap .setStr(bin);
        newMap .setName(name);
        mapRepo.save(newMap);
        System.out.println("add map success"+name);
    }

    public Map getMap(String name){
        return mapRepo.findByName(name);
    }

    public Map getNewestMap(){
        int size = mapRepo.findAll().size();
        return mapRepo.findAll().get(size-1);
    }
}