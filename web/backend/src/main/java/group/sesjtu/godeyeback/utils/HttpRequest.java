package group.sesjtu.godeyeback.utils;



import okhttp3.*;


import java.io.IOException;
import java.util.concurrent.TimeUnit;

/*
 * This is a utility to process http request
 * Based on OkHttp3,
 * Wrapped it with some exception handler and add request builder
 *
 * Usage:
 * get:
 * String result = new HttpRequest().get(String destinationUrl);
 * post:
 * String result = new HttpRequest().post(String destinationUrl, String JsonString);
 */
public class HttpRequest {
    //OkHttpClient client = new OkHttpClient();
    OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
    public static final MediaType JSON = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");

    public String get(String url){
        Request request = new Request.Builder().url(url).build();

        try{
            Response response = client.newCall(request).execute();
            return response.body().string();
        }catch (IOException e){
            System.out.println(e.toString());
        }

        return "error occurs when processing get method";
    }

    public String post(String url, String data){
        RequestBody body = RequestBody.create(JSON, data);

        Request request = new Request.Builder().url(url).post(body).build();
        try{
            Response response = client.newCall(request).execute();
            return response.body().string();
        }catch (IOException e){
            System.out.println(e.toString());
        }

        return "error occurs when processing post method with " + data;
    }

}
