package group.sesjtu.godeyeback.controller;

import group.sesjtu.godeyeback.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
public class CameraController {
    @Autowired
    private VideoService videoService;

    /* add the video */
    @RequestMapping("/video/add")
    protected String addVideo(@RequestParam("name") String name,
                             @RequestParam("url") String url){
        videoService.addVideo(name,url);
        return videoService.getVideo(name);
    }

    /* delete the video */
    @RequestMapping("/video/delete")
    protected void deleteVideo(@RequestParam("name") String name){
        videoService.deleteVideo(name);
    }

    @RequestMapping("/camera")
    protected String Camera(@RequestParam("camera") String camera,
                         @RequestParam("start") String start,
                         @RequestParam("end") String end){
        System.out.println("camera:"+camera+" start:"+start+" end:"+end);
        return "camera:"+camera+" start:"+start+" end:"+end;
    }

    @RequestMapping("/camera/add")
    protected String addCamera(@RequestParam("x") String x,@RequestParam("y") String y,
                            @RequestParam("height") String height,@RequestParam("alpha") String alpha,
                            @RequestParam("beta") String beta){
        return "add camera\nx:" + x+"\ny:"+y+"\nh:"+height+"\na:"+alpha+"\nb:"+beta;
    }

}
