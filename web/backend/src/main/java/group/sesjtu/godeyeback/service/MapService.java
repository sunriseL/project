package group.sesjtu.godeyeback.service;

public interface MapService {
    void setRoad(String mapName,int x,int y);

    int get(String mapName,int x,int y);

    void addMap(String name, String bin);

    int showMap(String name, int x,int y);

    String getMap(String name);
}