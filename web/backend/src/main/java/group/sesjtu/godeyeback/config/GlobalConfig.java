package group.sesjtu.godeyeback.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GlobalConfig {
    @Value("${ml.server.uploadImg}")
    private String uploadImg;

    public String getUploadImg(){
        return uploadImg;
    }

}
