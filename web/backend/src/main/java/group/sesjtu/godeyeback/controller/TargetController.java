package group.sesjtu.godeyeback.controller;

import com.google.gson.*;
import group.sesjtu.godeyeback.config.GlobalConfig;
import group.sesjtu.godeyeback.utils.Camera;
import group.sesjtu.godeyeback.utils.HttpRequest;
import group.sesjtu.godeyeback.utils.Point;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * This class handles the interaction between the frontend and the target server
 */
@CrossOrigin("http://localhost:3000")
@RestController
public class TargetController {
    @Autowired
    GlobalConfig config;
    private Logger log = LogManager.getLogger(TargetController.class.getName());

    /**
     * This method sends the target posted by frontend to the target server and
     * returns the response back to the frontend
     * @param imgStream The imgStream posted by frontend
     * @return The response of the target-tracing server
     */
    @RequestMapping("/target/trace")
    public String traceTarget(@RequestParam("imgStream") String imgStream) {
        HttpRequest request = new HttpRequest();
        HashMap<String, String> map = new HashMap<>();
        map.put("imgStream", imgStream);
        String url = config.getMachineLearningServer() + config.getTraceApi();
        String response = request.post(url, new Gson().toJson(map));
        log.info("Trace the target, success");
        return parseJsonArray(response);
    }

    /**
     * This method parses the jsonArray posted by the target server to String
     * @param response The response from the target server
     * @return String of response
     */
    public String parseJsonArray(String response){
        List<JsonObject> ansAry = new ArrayList<>();
        JsonObject jsonObj = new Gson().fromJson(response, JsonObject.class);
        JsonArray jsonAry = jsonObj.get("data").getAsJsonArray();
        for(JsonElement ele: jsonAry){
            JsonObject obj = ele.getAsJsonObject();
//            Camera resultCamera = new Camera(0,0,0,0,0,0,0);
//            Point p = resultCamera.coordinateChange(
//                    new Point(obj.get("x").getAsDouble(), obj.get("y").getAsDouble()));
            HashMap<String, String> map = new HashMap<>();
            map.put("x",obj.get("x").toString());
            map.put("y",obj.get("y").toString());
            map.put("cameraid",obj.get("cameraid").toString());
            map.put("time",Double.toString(obj.get("relative_time").getAsDouble()/1000));
//            map.put("x",Double.toString(p.getX()));
//            map.put("y",Double.toString(p.getY()));
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
