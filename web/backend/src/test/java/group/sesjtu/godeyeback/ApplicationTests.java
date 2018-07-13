package group.sesjtu.godeyeback;

import group.sesjtu.godeyeback.entity.Map;
import group.sesjtu.godeyeback.service.MapService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertNotSame;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {
    @Autowired
    MapService mapService ;
	@Test
	public void contextLoads() {
	}

	@Test
    public void testHasmap(){
        assertNotSame(mapService.hasMap(),0);
        System.out.println("test hasmap !=0");
    }

}
