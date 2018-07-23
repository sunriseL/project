package group.sesjtu.godeyeback;

import group.sesjtu.godeyeback.utils.Camera;
import group.sesjtu.godeyeback.utils.Point;
import org.junit.Test;

import static org.junit.Assert.*;


public class CameraTest {
    @Test
    public void testPointChange(){
        Camera c = new Camera(0,0,0,0,0,0,0);
        assertEquals("leftDown x",-0.1,c.coordinateChange(new Point(0,0)).getX(),0.0000001);
        assertEquals("leftDown y",-0.1,c.coordinateChange(new Point(0,0)).getY(),0.0000001);
        assertEquals("leftUp x",-0.1,c.coordinateChange(new Point(0,1)).getX(),0.0000001);
        assertEquals("leftUp y",0.1,c.coordinateChange(new Point(0,1)).getY(),0.0000001);
        assertEquals("rightUp y",0.1,c.coordinateChange(new Point(1,1)).getY(),0.0000001);
        assertEquals("rightUp y",0.1,c.coordinateChange(new Point(1,1)).getY(),0.0000001);
        assertEquals("rightDown x",0.1,c.coordinateChange(new Point(1,0)).getX(),0.0000001);
        assertEquals("rightDown y",-0.1,c.coordinateChange(new Point(1,0)).getY(),0.0000001);
        assertEquals("center x",0.0,c.coordinateChange(new Point(0.5,0.5)).getX(),0.0000001);
        assertEquals("center y",0.0,c.coordinateChange(new Point(0.5,0.5)).getY(),0.0000001);
    }

    @Test
    public void testGetX(){
        Camera c = new Camera(0,0,0,0,0,0,0);
        assertEquals("get p1 x",-0.1,c.getP1().getX(),0.0000001);
        assertEquals("get p1 y",-0.1,c.getP1().getY(),0.0000001);
        assertEquals("get p2 x",-0.1,c.getP2().getX(),0.0000001);
        assertEquals("get p2 y",0.1,c.getP2().getY(),0.0000001);
        assertEquals("get p3 x",0.1,c.getP3().getX(),0.0000001);
        assertEquals("get p3 y",0.1,c.getP3().getY(),0.0000001);
        assertEquals("get p4 x",0.1,c.getP4().getX(),0.0000001);
        assertEquals("get p4 y",-0.1,c.getP4().getY(),0.0000001);
    }

}
