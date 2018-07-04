package group.sesjtu.godeyeback.controller;

import group.sesjtu.godeyeback.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class IndexController {
    @Autowired
    private VideoService uService;

    @RequestMapping("/pic")
    protected String Picture(@RequestParam("name") String name,
                             @RequestParam("bin") String bin){
        uService.addPicture(name,bin);
        return uService.getPicture(name);
    }

}
