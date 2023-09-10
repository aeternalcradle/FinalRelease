package com.hao.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hao.pojo.Admin;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: haozhang
 * @Date: 2021/1/5 10:10
 */
public class HttpBodyHandlerUtils {
    private static Gson gson = new GsonBuilder().create();

    /**
     * 读取请求中的body
     * @param req
     * @return
     */
    public static String readBody(HttpServletRequest req) {
        //body 的长度在 header 中的一个 Content-Length 字段中
        //contentLength 的单位就是字节
        int contentLength = req.getContentLength();
        byte[] buf = new byte[contentLength];
        try (InputStream is = req.getInputStream()) {
            is.read(buf, 0, contentLength);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new String(buf);
    }

    /**
     * 把请求中的body转换为pojo
     * @param body
     * @param tClass
     * @param <T>
     * @return
     */
    public static <T> T stringToPojo(String body, Class<T> tClass) {
        return gson.fromJson(body, tClass);
    }

    public static <T> String pojoToString(T t) {
        return gson.toJson(t);
    }

    public static boolean isCompileComplete(String body) {
        String removeSpacesWrap = body.replaceAll("\r\n|\r|\n","");
        removeSpacesWrap = removeSpacesWrap.replaceAll(" +","");
        System.out.println(removeSpacesWrap);
        int idIndex = removeSpacesWrap.lastIndexOf("id");
        int idJudgmentIndex = idIndex + 4;
        int codeIndex = removeSpacesWrap.lastIndexOf("code");
        int codeJudgmentIndex = codeIndex + 7;
        System.out.println(removeSpacesWrap.charAt(idJudgmentIndex));
        System.out.println(removeSpacesWrap.charAt(idJudgmentIndex + 1));
        System.out.println(removeSpacesWrap.charAt(codeJudgmentIndex));
        System.out.println(removeSpacesWrap.charAt(codeJudgmentIndex + 1));
        if (removeSpacesWrap.charAt(idJudgmentIndex) == '"' && removeSpacesWrap.charAt(idJudgmentIndex + 1) == ',') {
            System.out.println("id为null");
            return false;
        } else if (removeSpacesWrap.charAt(codeJudgmentIndex) == '"' && removeSpacesWrap.charAt(codeJudgmentIndex + 1) == '}') {
            System.out.println("code为null");
            return false;
        }
        return true;
    }


    /**
     * {"id":"","title":"","level":"","description":"","templateCode":"","testCode":""}
     * @param body   我们判断body时需要考虑到换行 空格   判断的时候去掉
     * @return
     */
    public static boolean isComplete(String body) {
        String removeSpacesWrap = body.replaceAll("\r\n|\r|\n","");
        removeSpacesWrap = removeSpacesWrap.replaceAll(" +","");
        System.out.println(removeSpacesWrap);
        if (isMarks(removeSpacesWrap, "id")) {
            System.out.println("id为null");
            return false;
        } else if (isMarks(removeSpacesWrap, "title")) {
            System.out.println("title为null");
            return false;
        } else if (isMarks(removeSpacesWrap, "level")) {
            System.out.println("level为null");
            return false;
        } else if (isMarks(removeSpacesWrap, "description")) {
            System.out.println("description为null");
            return false;
        } else if (isMarks(removeSpacesWrap, "templateCode")) {
            System.out.println("templateCode为null");
            return false;
        } else if (isMarks(removeSpacesWrap, "testCode")) {
            System.out.println("testCode为null");
            return false;
        } else {
            return true;
        }
    }

    public static boolean isMarks(String body, String child) {
        int index = body.lastIndexOf(child);
        int judgmentIndex = index + child.length() + 3;
        if ("id".equals(child)) {
            judgmentIndex = index + child.length() + 2;
        }

        if (body.charAt(judgmentIndex) == '"' && body.charAt(judgmentIndex + 1) == ',') {
            return true;
        }
        return false;
    }




}
