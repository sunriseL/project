package group.sesjtu.godeyeback;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import group.sesjtu.godeyeback.controller.IndexController;
import group.sesjtu.godeyeback.utils.HttpRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;
@RunWith(SpringRunner.class)
@SpringBootTest
public class ControllerTest {
    @Autowired
    IndexController con;
    HttpRequest request = new HttpRequest();
    final String testURL1 = "http://59.78.46.173:8000/api/trace";

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
    public void testGenerateJson(){
        String leftDown = con.generateTargetJson("camera1","0.0","0.0");
        assertEquals("{\"x\":\"-0.1\",\"y\":\"-0.1\",\"camera\":\"camera1\"}",leftDown);
    }

    @Test
    public void testTraceTarget(){
        String ans = con.traceTarget("123");
        System.out.println(ans);
        assertNotNull("controller chooseTarget",ans);
    }



}
