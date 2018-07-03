package godeyeback.controller;

import godeyeback.service.PicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@CrossOrigin("http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private PicService uService;

    @RequestMapping("/pic")
    protected String Picture(@RequestParam("name") String name,
                             @RequestParam("bin") String bin){
        uService.addPicture(name,bin);
        return uService.getPicture(name);
    }

}
