package group.sesjtu.godeyeback.utils;
import java.lang.Math;


public class Camera {
    private double height, cameraX, cameraY, centerX, centerY, horizontalAngle, verticalAngle;
    private double relX, relY;
    private Point P1 = new Point(0,0);
    private Point P2 = new Point(0,0);
    private Point P3 = new Point(0,0);
    private Point P4 = new Point(0,0);
    // P1 is the left-down point of the shape, and points are numbered clock-wise
    public Camera(double height, double cameraX, double cameraY, double centerX, double centerY, double horizontalAngle, double verticalAngle){
        // get parameters from user setting and initialize the camera
        this.height = height;
        this.cameraX = cameraX;
        this.cameraY = cameraY;
        this.centerX = centerX;
        this.centerY = centerY;
        this.horizontalAngle = horizontalAngle;
        this.verticalAngle = verticalAngle;
        this.relX = centerX - cameraX;
        this.relY = centerY - cameraY;

        double centerAngle = Math.atan(Math.sqrt(Math.pow(relX, 2) + Math.pow(relY, 2)) / height);
        // initialize the 4 point coordinate on the 2-D map
        double betaDown = height * Math.tan(centerAngle - 0.5 * verticalAngle);
        double betaUp = height * Math.tan(centerAngle + 0.5 * verticalAngle);
        P2.setX(Math.cos(Math.atan(relY / relX)) * betaDown + Math.sin(Math.atan(relY / relX)) * height / Math.cos(centerAngle - verticalAngle / 2));
        P2.setY(Math.sin(Math.atan(relY / relX)) * betaDown - Math.cos(Math.atan(relY / relX)) * height / Math.cos(centerAngle - verticalAngle / 2));
        P1.setX(Math.cos(Math.atan(relY / relX)) * betaDown - Math.sin(Math.atan(relY / relX)) * height / Math.cos(centerAngle - verticalAngle / 2));
        P1.setY(Math.sin(Math.atan(relY / relX)) * betaDown + Math.cos(Math.atan(relY / relX)) * height / Math.cos(centerAngle - verticalAngle / 2));
        P3.setX(Math.cos(Math.atan(relY / relX)) * betaUp + Math.sin(Math.atan(relY / relX)) * height / Math.cos(centerAngle + verticalAngle / 2));
        P3.setY(Math.sin(Math.atan(relY / relX)) * betaUp - Math.cos(Math.atan(relY / relX)) * height / Math.cos(centerAngle + verticalAngle / 2));
        P4.setX(Math.cos(Math.atan(relY / relX)) * betaUp - Math.sin(Math.atan(relY / relX)) * height / Math.cos(centerAngle + verticalAngle / 2));
        P4.setY(Math.sin(Math.atan(relY / relX)) * betaUp + Math.cos(Math.atan(relY / relX)) * height / Math.cos(centerAngle + verticalAngle / 2));


    }



    // get a point from the ML part and change it into a point on the map
    public Point coordinateChange(Point MLPoint) {
        // ML Point's X and Y will range from 0-1, as a percentage of the max width and height
        double MLX = MLPoint.getX();
        double MLY = MLPoint.getY();
        double downX = (1 - MLX) * P1.getX() + MLX * P4.getX();
        double upX = (1 - MLX) * P2.getX() + MLX * P3.getX();
        double downY = (1 - MLX) * P1.getY() + MLX * P4.getY();
        double upY = (1 - MLX) * P2.getY() + MLX * P3.getY();
        double resultX = (1 - MLY) * downX + MLY * upX;
        double resultY = (1 - MLY) * downY + MLY * upY;
        Point resPoint = new Point(resultX, resultY);

        return resPoint;
    }

    public Point getP1() {
        return P1;
    }

    public Point getP2() {
        return P2;
    }

    public Point getP3() {
        return P3;
    }

    public Point getP4() {
        return P4;
    }
}
