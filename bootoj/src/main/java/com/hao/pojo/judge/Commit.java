package com.hao.pojo.judge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Commit {
    private int language_id;
    private String source_code;
    private String stdin;
    private String expected_output;
    private int time_limit;
    private int memory_limit;

    public Commit(int language_id, String source_code, String stdin, String expected_output) {
        this.language_id = language_id;
        this.source_code = source_code;
        this.stdin = stdin;
        this.expected_output = expected_output;
    }

    public Commit(int language_id, String source_code, String stdin, String expected_output, int time_limit, int memory_limit) {
        this.language_id = language_id;
        this.source_code = source_code;
        this.stdin = stdin;
        this.expected_output = expected_output;
        this.time_limit = time_limit;
        this.memory_limit = memory_limit;
    }
}
