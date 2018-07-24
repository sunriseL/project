package group.sesjtu.godeyeback.controller;

import group.sesjtu.godeyeback.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class MapController {
    @Autowired
    private MapService mapService;

    /* add new map to mongodb */
    @PostMapping("/map/add")
    public String addMap(@RequestParam("map_name")String map_name,
                         @RequestParam("map_bin")String map_bin){
        mapService.addMap(map_name,map_bin);
        return map_name;
    }

    /* delete map by name */
    @RequestMapping("/map/delete")
    public void deleteMap(@RequestParam("map_name")String map_name){
        mapService.deleteMap(map_name);
    }

    @RequestMapping("/map/get")
    public String getMap(@RequestParam("name") String name){
        return mapService.getMap(name).getStr();
    }

    @RequestMapping("/get_new_map")
    public String getNewMap(){
        return mapService.getNewestMap().getStr();
    }

    @RequestMapping("/has_map")
    public int hasMap(){
        return mapService.hasMap();
    }
}
