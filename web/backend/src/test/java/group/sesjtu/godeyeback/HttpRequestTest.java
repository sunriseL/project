package group.sesjtu.godeyeback;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import group.sesjtu.godeyeback.config.GlobalConfig;
import group.sesjtu.godeyeback.utils.HttpRequest;
import net.sf.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.aop.framework.adapter.GlobalAdvisorAdapterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource("classpath:application.properties")
public class HttpRequestTest {
    @Autowired
    GlobalConfig config;
    HttpRequest request = new HttpRequest();
    final String testURL = "http://59.78.46.173:8000/api/test";
    HashMap<String, Object> map = new HashMap();
    Object o = map.put("test", "test");
    final String jsonString = new Gson().toJson(map);

    @Test
    public void testGet(){
            String result = request.get(testURL);
            assertEquals("get failed with " + result, "get success", result);
    }

    @Test
    public void testPost(){
            String result = request.post(testURL, jsonString);
            assertEquals("post failed with "+result, jsonString, result);

    }

    @Test
    public void testGlobalConfig(){
        assertEquals("http://192.168.1.147:8000/api/uploadImg",config.getUploadImg());
    }
}
