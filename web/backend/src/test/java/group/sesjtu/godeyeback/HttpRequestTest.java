package group.sesjtu.godeyeback;

import com.google.gson.Gson;

import group.sesjtu.godeyeback.utils.HttpRequest;
import org.junit.Test;
import java.util.HashMap;

import static org.junit.Assert.*;

public class HttpRequestTest {

    HttpRequest request = new HttpRequest();
    final String testURL = "http://192.168.1.147:8000/api/test";

    @Test
    public void testGet(){
            String result = request.get(testURL);
            assertEquals("get failed with " + result, "get success", result);
    }

    @Test
    public void testPost(){
            HashMap<String, Object> map = new HashMap();
            Object o = map.put("test", "test");
            final String jsonString = new Gson().toJson(map);
            String result = request.post(testURL, jsonString);
            assertEquals("post failed with "+result, jsonString, result);
    }

}
