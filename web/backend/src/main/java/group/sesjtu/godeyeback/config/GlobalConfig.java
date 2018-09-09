package group.sesjtu.godeyeback.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


/*
 * This is a configuration class for the whole project(backend)
 * Cam be used to dynamically fill in urls or other variables
 * Values are got from application.properties
 * Has some troubles in testing
 *
 * Usage:
 * config.getXXX();
 */
@Component
public class GlobalConfig {
    @Value("${ml.server}")
    private String MachineLearningServer;

    @Value("${ml.choose}")
    private String ChooseApi;

    @Value("${ml.trace}")
    private String TraceApi;

    @Value("${ml.test}")
    private String TestApi;

    public String getMachineLearningServer(){
        return MachineLearningServer;
    }

    public String getChooseApi(){
        return ChooseApi;
    }

    public String getTraceApi(){
        return TraceApi;
    }

    public String getTestApi(){
        return TestApi;
    }

}
