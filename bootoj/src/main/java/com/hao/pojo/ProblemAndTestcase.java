package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter

public class ProblemAndTestcase {
    private String title;
    private String level;
    private String description;

    private String input_desc;

    private  String output_desc;

    private String tag;

    private List<String> test_ins = new ArrayList<>();
    private List<String> test_outs = new ArrayList<>();

    public ProblemAndTestcase(Problem problem, List<String> test_ins, List<String> test_outs) {
        this.title = problem.getTitle();
        this.level = problem.getTitle();
        this.description = problem.getDescription();
        this.input_desc = problem.getInput_desc();
        this.output_desc = problem.getOutput_desc();
        this.tag = problem.getTag();
        this.test_ins.addAll(test_ins);
        this.test_outs.addAll(test_outs);
    }
}
