package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAnswer {
    private int id;
    private String user_name;
    private int problem_id;
    private int pass_count;
    private int total_count;

    public UserAnswer() {
    }

    public UserAnswer(String user_name, int problem_id, int pass_count, int total_count) {
        this.user_name = user_name;
        this.problem_id = problem_id;
        this.pass_count = pass_count;
        this.total_count = total_count;
    }
}
