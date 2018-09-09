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

    /**
     * This method adds a map to database
     * @param map_name The name the user inputs
     * @param map_bin The binary stream of the map
     * @return map_name
     */
    @PostMapping("/map/add")
    public String addMap(@RequestParam("map_name")String map_name,
                         @RequestParam("map_bin")String map_bin){
        mapService.addMap(map_name,map_bin);
        return map_name;
    }

    /**
     * This method deletes the map with the name
     */
    @RequestMapping("/map/delete")
    public void deleteMap(@RequestParam("map_name")String map_name){
        mapService.deleteMap(map_name);
    }

    /**
     * This method returns a map according to the map name
     * @return The binary stream of map
     */
    @RequestMapping("/map/get")
    public String getMap(@RequestParam("name") String name){
        return mapService.getMap(name).getStr();
    }

    /**
     * This method gets the default map in the database and returns to the frontend
     * @return The binary stream of the default map
     */
    @RequestMapping("/get_new_map")
    public String getNewMap(){
        return mapService.getNewestMap().getStr();
    }

    /**
     * This method returns the number of maps in the database
     */
    @RequestMapping("/has_map")
    public int hasMap(){
        return mapService.hasMap();
    }

}
