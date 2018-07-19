package group.sesjtu.godeyeback.controller;

import com.google.gson.Gson;
import group.sesjtu.godeyeback.config.GlobalConfig;
import group.sesjtu.godeyeback.entity.Map;
import group.sesjtu.godeyeback.service.MapService;
import group.sesjtu.godeyeback.service.VideoService;
import group.sesjtu.godeyeback.utils.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin("http://localhost:3000")
@RestController
public class IndexController {
    @Autowired
    private VideoService videoService;
    @Autowired
    private MapService mapService;
    @Autowired
    GlobalConfig config;

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
    protected String getNewMap(){
        System.out.println("get new map");
        return mapService.getNewestMap().getStr();
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



    @RequestMapping("/target/choose")
    protected  String chooseTarget(@RequestParam("imgStream") String imgStream){
        HttpRequest request = new HttpRequest();
        HashMap<String, String> map = new HashMap<>();
        map.put("imgStream", imgStream);
        String data = new Gson().toJson(map);
        return request.post("http://192.168.1.147:8000/api/choose", data);
    }

    @RequestMapping("/target/trace")
    protected String traceTarget(@RequestParam("imgStream") String imgStream) {
        HttpRequest request = new HttpRequest();
        HashMap<String, String> map = new HashMap<>();
        map.put("imgStream", imgStream);
        return request.post("http://192.168.1.147:8000/api/trace", new Gson().toJson(map));
    }

}
