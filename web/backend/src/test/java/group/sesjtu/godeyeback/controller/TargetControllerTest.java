package group.sesjtu.godeyeback.controller;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TargetControllerTest {
    @Autowired
    private org.springframework.web.context.WebApplicationContext context;
    @Autowired
    TargetController con;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(context).build();
    }

    @Test
    public void parseJsonByParam() {
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
    public void generateTargetJson() {
        String leftDown = con.generateTargetJson("camera1","0.0","0.0");
        assertEquals("{\"x\":\"-0.1\",\"y\":\"-0.1\",\"camera\":\"camera1\"}",leftDown);
    }

//    @Test
//    public void chooseTarget() throws Exception {
//        mockMvc.perform(post("/target/choose").param("imgStream", "123"))
//                .andExpect(status().isOk());
//    }

    @Test
    public void traceTarget() throws Exception {
        mockMvc.perform(post("/target/trace").param("imgStream", "123"))
                .andExpect(status().isOk())
                .andDo(print());
    }
}