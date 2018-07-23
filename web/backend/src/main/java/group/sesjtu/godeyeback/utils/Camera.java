package group.sesjtu.godeyeback.utils;

import static java.lang.StrictMath.*;


public class Camera {
    private double height, cameraX, cameraY, alpha, beta, horizontalAngle, verticalAngle;
    private double relX, relY;
    private Point P1 = new Point(0,0);
    private Point P2 = new Point(0,0);
    private Point P3 = new Point(0,0);
    private Point P4 = new Point(0,0);
    // P1 is the left-down point of the shape, and points are numbered clock-wise
    public Camera(double height, double cameraX, double cameraY, double alpha, double beta, double horizontalAngle, double verticalAngle){
        // get parameters from user setting and initialize the camera
        this.height = height;
        this.cameraX = cameraX;
        this.cameraY = cameraY;
        this.alpha = alpha;
        this.beta = beta;
        this.horizontalAngle = horizontalAngle;
        this.verticalAngle = verticalAngle;

        double a = sqrt(1 / (1 - pow(sin(horizontalAngle), 2) - pow(sin(verticalAngle), 2)) - 1);
        double centerAngle = atan(sqrt(pow(relX, 2) + pow(relY, 2)) / height);
        // initialize the 4 point coordinate on the 2-D map
//        P1.setX(cameraX + ((((pow(a, 2) + 1) * cos(horizontalAngle / 2) * pow(tan(horizontalAngle / 2), 2) * cos(alpha) * sin(alpha) * pow(sin(beta), 3)) +
//                ((sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * pow(cos(alpha), 2) - sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * pow(sin(alpha), 2)) * pow(sin(beta), 2)) +
//                (((pow(a, 2) + 1) * sin(horizontalAngle / 2) * tan(horizontalAngle / 2) * sin(alpha) * cos(alpha) * pow(cos(beta), 2) + (-pow(a, 2) - 1) * tan(horizontalAngle / 2) * sin(verticalAngle / 2) * pow(cos(alpha), 2) * cos(beta) - cos(horizontalAngle / 2) * cos(alpha) * sin(horizontalAngle)) * sin(beta)) -
//                (sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * pow(sin(alpha), 2) * pow(cos(beta), 2)) +
//                (sqrt(pow(a, 2) + 1) * sin(verticalAngle / 2) * cos(alpha) * sin(alpha) * cos(beta))) * height) /
//                ((sqrt(pow(a, 2) + 1) * sin(verticalAngle / 2) * pow(sin(alpha), 2) + sqrt(pow(a, 2) + 1) * sin(verticalAngle / 2) * pow(cos(alpha), 2)) * sin(beta) +
//                (cos(horizontalAngle / 2) * pow(sin(alpha), 2) + cos(horizontalAngle / 2) * pow(cos(alpha), 2)) * cos(beta)));
//        P1.setY(cameraY + (sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * cos(alpha) * pow(sin(beta), 2) - (cos(horizontalAngle / 2) * sin(alpha) * sin(beta)) + sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * cos(alpha) * pow(cos(beta), 2) + sqrt(pow(a, 2) + 1) * sin(verticalAngle / 2) * sin(alpha) * cos(beta)) * height /
//                (sqrt(pow(a, 2) + 1) * sin(verticalAngle / 2) * sin(beta) + (cos(horizontalAngle / 2)) * cos(beta)));
//        P2.setX(((pow(a, 2) + 1) * sin(horizontalAngle / 2) * cos(horizontalAngle / 2) * cos(alpha) * sin(alpha) * pow(sin(beta), 3)+
//                (sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * pow(cos(alpha), 2) - sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * pow(sin(alpha), 2)) * pow(sin(beta), 2)+
//                ((pow(a, 2) + 1) * sin(horizontalAngle / 2) * cos(horizontalAngle / 2) * cos(alpha) * sin(alpha) * pow(cos(beta), 2) + (pow(a, 2) + 1) * tan(horizontalAngle / 2) * sin(verticalAngle / 2) * pow(cos(alpha), 2) * cos(beta) - cos(horizontalAngle / 2) * sin(alpha) * cos(alpha)) * sin(beta)-
//                sqrt(pow(a, 2) + 1) * sin(horizontalAngle / 2) * pow(sin(alpha), 2) * pow(cos(beta), 2)-
//                sqrt(pow(a,2) + 1) * sin(verticalAngle / 2) * cos(alpha) * sin(alpha) * cos(beta)) * height /
//                (sqrt(pow(a, 2) + 1) * sin(verticalAngle / 2) * sin(beta) - cos(horizontalAngle / 2) * cos(beta)));
//        P2.setY((sqrt(pow(a,2) + 1) * sin(horizontalAngle / 2) * cos(alpha) - cos(horizontalAngle / 2) * sin(alpha) * sin(beta) - sqrt(pow(a,2) + 1) * sin(verticalAngle / 2) * sin(alpha) * cos(beta)) * height /
//                (sqrt(pow(a,2) + 1) * sin(verticalAngle / 2) * sin(beta) - cos(horizontalAngle / 2) * cos(beta)));
        P1.setX(cameraX - 0.1);
        P1.setY(cameraY - 0.1);
        P2.setX(cameraX - 0.1);
        P2.setY(cameraY + 0.1);
        P3.setX(cameraX + 0.1);
        P3.setY(cameraY + 0.1);
        P4.setX(cameraX + 0.1);
        P4.setY(cameraY - 0.1);
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
