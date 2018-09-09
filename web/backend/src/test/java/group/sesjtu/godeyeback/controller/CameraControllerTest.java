package group.sesjtu.godeyeback.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CameraControllerTest {
    @Autowired
    private org.springframework.web.context.WebApplicationContext context;
    @Autowired
    CameraController con;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(context).build();
    }

    @Test
    public void addVideo()  throws Exception {
        String videoUrl = mockMvc.perform(post("/video/add")
                .param("name", "videoTest")
                .param("url","videoUrl")).andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertEquals("add video success",videoUrl,"videoUrl");
        mockMvc.perform(post("/video/delete")
                .param("name", "videoTest")).andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void camera()throws Exception {
        String result = mockMvc.perform(get( "/camera")
                .param("camera", "1").param("start","sTime").param("end","eTime"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertEquals("select camera time","camera:1 start:sTime end:eTime",result);
    }

    @Test
    public void addCamera() throws Exception {
        String result = mockMvc.perform((get("/camera/add")
                .param("x", "12").param("y","34").param("height","5")
                .param("alpha","54").param("beta","90")))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertEquals("add camera","add camera\nx:12\ny:34\nh:5\na:54\nb:90",result);
    }

}