package group.sesjtu.godeyeback.controller;

import group.sesjtu.godeyeback.entity.Map;
import group.sesjtu.godeyeback.service.MapService;
import group.sesjtu.godeyeback.service.VideoService;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
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
    @PostMapping("/map/add")
    protected String addMap(@RequestParam("map_name")String map_name,
                            @RequestParam("map_bin")String map_bin){
        System.out.println(map_name);
        mapService.addMap(map_name,map_bin);
        return map_name;
    }

    @RequestMapping("/map/get")
    protected String getMap(@RequestParam("name") String name){
        return mapService.getMap(name).getStr();
    }


    @RequestMapping("/get_new_map")
    protected JSONArray getNewMap(){
        return JSONArray.fromObject(mapService.getNewestMap());
    }

    @RequestMapping("/has_map")
    protected int hasMap(){
        return mapService.hasMap();
    }

    @RequestMapping("/camera")
    protected String Camera(@RequestParam("camera") String camera,
                         @RequestParam("start") String start,
                         @RequestParam("end") String end){
        System.out.println("camera:"+camera+" start:"+start+" end:"+end);
        return "select camera success!";
    }
    @RequestMapping("/camera/add")
    protected String Camera(@RequestParam("x") String x,@RequestParam("y") String y,
                            @RequestParam("height") String height,@RequestParam("alpha") String alpha,
                            @RequestParam("beta") String beta){
        return "add camera\nx:" + x+"\ny:"+y+"\nh:"+height+"\na:"+alpha+"\nb:"+beta;
    }


}
