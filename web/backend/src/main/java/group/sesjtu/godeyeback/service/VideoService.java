package group.sesjtu.godeyeback.service;


public interface VideoService {
    void addVideo(String name, String bin);

    String getVideo(String name);

    long deleteVideo(String name);
}