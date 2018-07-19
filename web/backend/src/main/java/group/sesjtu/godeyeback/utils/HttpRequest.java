package group.sesjtu.godeyeback.utils;



import okhttp3.*;


import java.io.IOException;

public class HttpRequest {
    OkHttpClient client = new OkHttpClient();
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
