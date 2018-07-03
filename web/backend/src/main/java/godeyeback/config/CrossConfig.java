package godeyeback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
//@Configuration
public class CrossConfig {
    @RequestMapping(method = RequestMethod.OPTIONS)
    public void setHeader(HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT,DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,If-Match,If-None-Match,X-Experience-API-Version,X-Experience-API-Consistent-Through");
        response.setHeader("Access-Control-Expose-Headers", "ETag,Last-Modified,Cache-Control,Content-Type,Content-Length,WWW-Authenticate,X-Experience-API-Version,X-Experience-API-Consistent-Through");
        response.setHeader("Access-Control-Allow-Origin", "*");
    }
}
*/