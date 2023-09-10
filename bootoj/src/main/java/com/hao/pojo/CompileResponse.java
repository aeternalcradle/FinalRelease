package com.hao.pojo;

public class CompileResponse {
    /**
     * 表示是否成功
     */
    private int ok;

    /**
     *
     */
    private String reason;

    private String stdout;

    public int getOk() {
        return ok;
    }

    public void setOk(int ok) {
        this.ok = ok;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStdout() {
        return stdout;
    }

    public void setStdout(String stdout) {
        this.stdout = stdout;
    }
}
