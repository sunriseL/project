package group.sesjtu.godeyeback;

import group.sesjtu.godeyeback.entity.Map;
import group.sesjtu.godeyeback.service.MapService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {
    @Autowired
    MapService mapService ;
	@Test
	public void contextLoads() {
	}

	@Test
    public void hasMapTest(){
        assertNotSame("hasMap failed", mapService.hasMap(),0);
    }

    @Test
    public void setGetDelMapTest(){
	    String mapStr = "testMapString";
	    mapService.addMap("testGetMap3", mapStr);
        assertEquals("set-get failed", mapStr, mapService.getMap("testGetMap3").getStr());
        mapService.deleteMap("testGetMap3");
        mapService.addMap("testGetMap3", mapStr);
        assertEquals("delete failed", mapStr, mapService.getMap("testGetMap3").getStr());
        assertEquals("set default map failed", mapStr, mapService.getNewestMap().getStr());
        mapService.deleteMap("testGetMap3");
    }

}
