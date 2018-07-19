package group.sesjtu.godeyeback;

import com.google.gson.Gson;
import group.sesjtu.godeyeback.utils.HttpRequest;
import org.junit.Test;

import java.io.IOException;
import java.util.HashMap;

import static org.junit.Assert.*;

public class HttpRequestTest {
    HttpRequest request = new HttpRequest();
    final String testURL = "http://59.78.46.173:8000/api/test";
    HashMap<String, Object> map = new HashMap();
    Object o = map.put("test", "test");
    final String jsonString = new Gson().toJson(map);

    @Test
    public void testGet(){
        try{
            String result = request.get(testURL);
            assertEquals("get failed with " + result, "get success", result);
        }catch (IOException e){
            System.out.println(e.toString());
        }

    }

    @Test
    public void testPost(){
        try{;
            String result = request.post(testURL, jsonString);
            assertEquals("post failed with "+result, jsonString, result);
        }catch (IOException e){
            System.out.println(e.toString());
        }
    }


}
