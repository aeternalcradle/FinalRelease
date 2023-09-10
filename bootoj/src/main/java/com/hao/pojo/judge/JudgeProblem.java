package com.hao.pojo.judge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JudgeProblem {
    private Integer id;

    private String title;

    private String level;

    private String description;

    private String tempate_code;

    private Integer time_limit;

    private Integer memory_limit;

    private String stdin;

    private String expected_out;
}
