package group.sesjtu.godeyeback.controller;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import group.sesjtu.godeyeback.config.GlobalConfig;
import group.sesjtu.godeyeback.entity.Map;
import group.sesjtu.godeyeback.service.MapService;
import group.sesjtu.godeyeback.service.VideoService;
import group.sesjtu.godeyeback.utils.Camera;
import group.sesjtu.godeyeback.utils.HttpRequest;
import group.sesjtu.godeyeback.utils.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
    public  String chooseTarget(@RequestParam("imgStream") String imgStream){
        HttpRequest request = new HttpRequest();
        HashMap<String, String> map = new HashMap<>();
        map.put("imgStream", imgStream);
        String url = config.getMachineLearningServer() + config.getChooseApi();
        return request.post(url, new Gson().toJson(map));

    }

    @RequestMapping("/target/trace")
    public String traceTarget(@RequestParam("imgStream") String imgStream) {
        HttpRequest request = new HttpRequest();
        HashMap<String, String> map = new HashMap<>();
        map.put("imgStream", imgStream);
        String url = config.getMachineLearningServer() + config.getTraceApi();
        String response = request.post(url, new Gson().toJson(map));
        return parseJsonArray(response);
    }

    public String parseJsonArray(String response){
        List<JsonObject> ansAry = new ArrayList<>();
        JsonObject jsonObj = new Gson().fromJson(response, JsonObject.class);
        JsonArray jsonAry = jsonObj.get("data").getAsJsonArray();
        for(JsonElement ele: jsonAry){
            JsonObject obj = ele.getAsJsonObject();
            Camera resultCamera = new Camera(0,0,0,0,0,0,0);
            Point p = resultCamera.coordinateChange(
                    new Point(obj.get("x").getAsDouble(), obj.get("y").getAsDouble()));
            HashMap<String, String> map = new HashMap<>();
            map.put("cameraid",obj.get("cameraid").toString());
            map.put("x",Double.toString(p.getX()));
            map.put("y",Double.toString(p.getY()));
            ansAry.add(new Gson().fromJson(new Gson().toJson(map),JsonObject.class));
        }
        return new Gson().toJson(ansAry);
    }

    public String parseJsonByParam(String para, String jsonStr){
        JsonObject jsonObject = new JsonParser().parse(jsonStr).getAsJsonObject();
        return jsonObject.get(para).getAsString();
    }

    public String generateTargetJson(String camera, String x, String y){
        HashMap<String, String> map = new HashMap<>();
        map.put("camera", camera);
        Camera resultCamera = new Camera(0,0,0,0,0,0,0);
        Point p = resultCamera.coordinateChange(new Point(Double.valueOf(x),Double.valueOf(y)));
        map.put("x", Double.toString(p.getX()));
        map.put("y", Double.toString(p.getY()));
        return new Gson().toJson(map);
    }
}
