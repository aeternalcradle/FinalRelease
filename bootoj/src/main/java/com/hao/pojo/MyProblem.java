package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyProblem {
    private Integer problem_id;
    private String title;
    private String level;
    private Integer pass_count;
    private Integer total_count;
    private String pass_rate;

    public MyProblem() {
    }

    public MyProblem(Integer problem_id, String title, String level, Integer pass_count, Integer total_count, String pass_rate) {
        this.problem_id = problem_id;
        this.title = title;
        this.level = level;
        this.pass_count = pass_count;
        this.total_count = total_count;
        this.pass_rate = pass_rate;
    }
}