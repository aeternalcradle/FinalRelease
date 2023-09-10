package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * 一次编译运行过程中都产生了哪写数据
 *
 * @author haozhang
 * @date 2020/12/22 09：56
 */
@Getter
@Setter
public class  Answer {

    /**
     * 通过error来表示当前的错误类型
     * 0 表示没错
     * 1 表示编译出错
     * 2 表示运行出错
     */
    private int error;

    /**
     * 表示具体的出错原因。可能是编译错误，也可能是运行错误（异常信息）
     */
    private String reason;

    /**
     * 执行时标准输出对应的内容
     */
    private String stdout;
    private double time;
    private int memory;
    private String stderr;
    private String token;
    private String compile_output;
    private String message;
    private Status status;

    @Getter
    @Setter
    public static class Status {
        private int id;
        private String description;

        // Getter and Setter methods

        // Constructors
    }

    /**
     * 执行时标准错误对应的内容
     */




    @Override
    public String toString() {
        return "Answer{" +
                "error=" + error +
                ", reason='" + reason + '\'' +
                ", stdout='" + stdout + '\'' +
                ", stderr='" + stderr + '\'' +
                ", time='" + time + '\'' +
                ", memory='" + memory + '\'' +
                ", stderr='" + stderr + '\'' +
                ", description'" + status.description + '\'' +
                ", compile_output'" + compile_output + '\'' +
                '}';
    }
}
