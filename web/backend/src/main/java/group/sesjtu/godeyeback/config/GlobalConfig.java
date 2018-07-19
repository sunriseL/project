package group.sesjtu.godeyeback.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
