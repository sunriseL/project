package group.sesjtu.godeyeback.controller;

import group.sesjtu.godeyeback.service.VideoService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class CameraController {
    @Autowired
    private VideoService videoService;
    private Logger log = LogManager.getLogger(CameraController.class.getName());

    /**
     * This method adds a video to the mongodb
     * @param name The name of video
     * @param url The url of video
     */
    @RequestMapping("/video/add")
    protected void addVideo(@RequestParam("name") String name,
                             @RequestParam("url") String url){
        videoService.addVideo(name,url);
    }

    /**
     * This method deletes a video from the database
     * @param name The name of video
     */
    @RequestMapping("/video/delete")
    protected void deleteVideo(@RequestParam("name") String name){
        videoService.deleteVideo(name);
    }

    /**
     * This method finds the videos matches the requirement
     * @param camera The name of camera
     */
    @RequestMapping("/camera")
    protected String camera(@RequestParam("camera") String camera,
                         @RequestParam("start") String start,
                         @RequestParam("end") String end){
        log.info("camera:"+camera+" start:"+start+" end:"+end);
        return "camera:"+camera+" start:"+start+" end:"+end;
    }

    /**
     * This method adds a camera with the given argument to database
     */
    @RequestMapping("/camera/add")
    protected String addCamera(@RequestParam("x") String x,@RequestParam("y") String y,
                            @RequestParam("height") String height,@RequestParam("alpha") String alpha,
                            @RequestParam("beta") String beta){
        log.info("add camera\nx:" + x+"\ny:"+y+"\nh:"+height+"\na:"+alpha+"\nb:"+beta);
        return "add camera\nx:" + x+"\ny:"+y+"\nh:"+height+"\na:"+alpha+"\nb:"+beta;
    }

}
