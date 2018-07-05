package group.sesjtu.godeyeback.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;

@Document
public class Map implements Serializable {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Indexed(unique = true)
    private String name;
    private String str;
    private int[][] map = new int[4][3];

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setStr(String str) {
        this.str = str;
    }

    public String getStr() {
        return str;
    }

    //0 1 2... may used to symbolize the road/obstacles/stairs
    public void setZero(int x,int y) {
        this.map[x][y] = 0;
    }

    public void setOne(int x,int y) {
        //this.map[x][y] = 1;
       // this.str[x*y+y]='1';
        this.str = replace(this.str,"1",x*3+y);
        System.out.println("replace:"+this.str);
    }

    public int getPoint(int x,int y) {
        return str.charAt(x*3+y)-48;
    }

    private String replace(String mystring,String content, int location){
        return mystring.substring(0, location)+content+mystring.substring(location+1);
    }
}
