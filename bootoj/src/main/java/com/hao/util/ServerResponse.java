package com.hao.util;

/**
 * @author: haozhang
 * @Date: 2021/2/8 21:54
 */
public class ServerResponse {
    private Integer ok;
    private String reason;

    public ServerResponse() {
    }

    public ServerResponse(Integer ok, String reason) {
        this.ok = ok;
        this.reason = reason;
    }

    public Integer getOk() {
        return ok;
    }

    public void setOk(Integer ok) {
        this.ok = ok;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
