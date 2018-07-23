package group.sesjtu.godeyeback;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import group.sesjtu.godeyeback.controller.IndexController;
import group.sesjtu.godeyeback.utils.Camera;
import group.sesjtu.godeyeback.utils.Point;
import org.junit.Test;

import java.util.HashMap;

import static org.junit.Assert.*;

public class ControllerTest {
    IndexController con = new IndexController();

    @Test
    public void testParseJsonByParam(){
        HashMap<String, String> map = new HashMap<>();
        map.put("camera", "camera1");
        map.put("x", "23");
        map.put("y", "54");
        String jsonStrInstance = new Gson().toJson(map);
        assertEquals("camera1", con.parseJsonByParam("camera",jsonStrInstance));
        assertEquals("23", con.parseJsonByParam("x",jsonStrInstance));
        assertEquals("54", con.parseJsonByParam("y",jsonStrInstance));
    }

    @Test
    public void testPointChange(){
        Camera c = new Camera(0,0,0,0,0,0,0);
      //  assertEquals(-0.1,c.coordinateChange(new Point(0,0)).getX());
        assertSame(new Point(0.1,0.1), c.coordinateChange(new Point(1,1)));
        assertEquals(new Point(0.0,0.0), c.coordinateChange(new Point(0.5,0.5)));
    }

    @Test
    public void testGenerateJson(){
        String leftDown = con.generateTargetJson("camera1","0.3","0.7");
        assertEquals("{\"x\":\"-0.1\",\"y\":\"-0.1\",\"camera\":\"camera1\"}",leftDown);
    }

}
