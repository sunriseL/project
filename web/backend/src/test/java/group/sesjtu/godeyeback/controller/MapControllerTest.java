package group.sesjtu.godeyeback.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MapControllerTest {
    @Autowired
    private org.springframework.web.context.WebApplicationContext context;
    @Autowired
    MapController con;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(context).build();
    }

    @Test
    public void getNewMap() throws Exception {
        String newMapUrl = mockMvc.perform(get("/get_new_map"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertNotNull("has default map",newMapUrl);
    }

    @Test
    public void hasMap() throws Exception {
        String result = mockMvc.perform(get( "/has_map"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertNotEquals("the number of maps","0",result);
    }

    @Test
    public void addAndGetMap() throws Exception {
        /* add a new map */
        String mapName = mockMvc.perform(post("/map/add")
                .param("map_name", "mapTest")
                .param("map_bin","map_bin_test")).andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertEquals("add map",mapName,"mapTest");

        /* get the added map */
        String mapUrl = mockMvc.perform(get("/map/get")
                .param("name", "mapTest"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        assertEquals("get map url",mapUrl,"map_bin_test");

        /* clear db */
        mockMvc.perform(get("/map/delete")
                .param("map_name", "mapTest"))
                .andExpect(status().isOk())
                .andDo(print());
    }

}