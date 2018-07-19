package group.sesjtu.godeyeback.utils;

import okhttp3.*;
import org.json.JSONObject;

import java.io.IOException;

public class HttpRequest {
    OkHttpClient client = new OkHttpClient();
    public static final MediaType JSON = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");



    public String get(String url) throws IOException {
        Request request = new Request.Builder().url(url).build();

        Response response = client.newCall(request).execute();
        return response.body().string();
    }

    public String post(String url, String data) throws IOException{
        RequestBody body = RequestBody.create(JSON, data);

        Request request = new Request.Builder().url(url).post(body).build();

        Response response = client.newCall(request).execute();

        return response.body().string();
    }

}
