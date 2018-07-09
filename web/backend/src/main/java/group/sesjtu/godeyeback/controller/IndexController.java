package group.sesjtu.godeyeback.controller;

import group.sesjtu.godeyeback.entity.Map;
import group.sesjtu.godeyeback.service.MapService;
import group.sesjtu.godeyeback.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class IndexController {
    @Autowired
    private VideoService videoService;
    @Autowired
    private MapService mapService;

    /* search the video by time.. */
    @RequestMapping("/video/search")
    protected String searchVideo(@RequestParam("name") String name,
                             @RequestParam("bin") String bin){
        videoService.addVideo(name,bin);
        return videoService.getVideo(name);
    }

    /* add new map to mongodb */
    @RequestMapping("/map/add")
    protected String addMap(@RequestParam("name") String name,
                                 @RequestParam("bin") String bin){
        mapService.addMap(name,bin);
        return mapService.getMap(name);
    }

    @RequestMapping("/map/get")
    protected String getMap(@RequestParam("name") String name){
        return mapService.getMap(name);
    }

    @RequestMapping("/map/setRoad")
    protected int addMap(@RequestParam("name") String name,
                         @RequestParam("x") int x,
                         @RequestParam("y") int y){
        mapService.setRoad(name,x,y);
        System.out.println(mapService.get(name,x,y));
        return mapService.get(name,1,0);
    }

    @RequestMapping("/test")
    protected String test(){
        return "backend:OK";
    }
}
