package group.sesjtu.godeyeback.service;

import group.sesjtu.godeyeback.entity.Map;

public interface MapService {

    void addMap(String name, String bin);

    int hasMap();

    Map getMap(String name);

    Map getNewestMap();
}