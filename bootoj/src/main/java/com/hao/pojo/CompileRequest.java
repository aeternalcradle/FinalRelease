package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

/**
 * @author: haozhang
 * @Date: 2021/1/3 15:51
 */
@Getter
@Setter
public class CompileRequest {

    /**
     * 表示题目id
     */
    private int id;

    private int language_id;

    /**
     * 表示用户提交的代码
     */
    private String code;

    private String user_name;



}
