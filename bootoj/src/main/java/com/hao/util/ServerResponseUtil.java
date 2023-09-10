package com.hao.util;

/**
 * @author: haozhang
 * @Date: 2021/2/8 21:56
 */
public class ServerResponseUtil {
    private static final ServerResponse SERVER_RESPONSE = new ServerResponse();
    public static String serverResponse(Integer ok, String reason) {
        SERVER_RESPONSE.setOk(ok);
        SERVER_RESPONSE.setReason(reason);
        return HttpBodyHandlerUtils.pojoToString(SERVER_RESPONSE);
    }
}
