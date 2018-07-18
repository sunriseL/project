package group.sesjtu.godeyeback;

import group.sesjtu.godeyeback.utils.Camera;
import group.sesjtu.godeyeback.utils.Point;
import org.junit.Test;

import static org.junit.Assert.*;


public class CameraTest {
    @Test
    public void testCoordinateChange(){
        Camera testCamera = new Camera(1,0,0,0,Math.PI * 0.5, Math.PI / 4, Math.PI /4);
        System.out.println(testCamera.getP1().getX());
        System.out.println(testCamera.getP1().getY());
        System.out.println(testCamera.getP2().getX());
        System.out.println(testCamera.getP2().getY());
        System.out.println(testCamera.getP3().getX());
        System.out.println(testCamera.getP3().getY());
        System.out.println(testCamera.getP4().getX());
        System.out.println(testCamera.getP4().getY());
//        double deltaX, deltaY;
//        Point resultPoint = testCamera.coordinateChange(new Point(0,0));
//        deltaX = resultPoint.getX() - 0;
//        deltaY = resultPoint.getY() - 5;
//        assertTrue("Point 1 failed", deltaX > 0.001 || deltaY > 0.001);
//
//        resultPoint = testCamera.coordinateChange(new Point(1, 1));
//        deltaX = resultPoint.getX() - 20;
//        deltaY = resultPoint.getY() - 0;
//        assertTrue("Point 2 failed", deltaX > 0.001 || deltaY > 0.001);
//
//        resultPoint = testCamera.coordinateChange(new Point(0.5, 0.5));
//        deltaX = resultPoint.getX() - 10;
//        deltaY = resultPoint.getY() - 10;
//        System.out.println(resultPoint.getX());
//        System.out.println(resultPoint.getY());
//        assertTrue("Point 3 failed", deltaX > 0.001 || deltaY > 0.001);

    }
}
