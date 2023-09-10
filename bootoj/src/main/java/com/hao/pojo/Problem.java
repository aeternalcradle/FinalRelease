package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author: haozhang
 * @Date: 2020/12/21 17:46
 */
@Setter
@Getter
public class Problem {

    private Integer id;

    private String title;

    private String level;

    private String description;

    private String templateCode;

    private String testCode;

    private String input_desc;

    private String output_desc;

    private String tag;

    private List<String> test_in;

    private List<String> test_out;

    public Problem() {
    }

    public Problem(Integer id, String title, String level, String description) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.description = description;
        this.templateCode = null;
        this.testCode = null;
    }

    public Problem(Integer id, String title, String level, String description,
                   String templateCode, String testCode) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.description = description;
        this.templateCode = templateCode;
        this.testCode = testCode;
    }

    public Problem(Integer id, String title, String level, String description,
                   String templateCode, String testCode, List<String> test_in, List<String> test_out) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.description = description;
        this.templateCode = templateCode;
        this.testCode = testCode;
        this.test_in = test_in;
        this.test_out = test_out;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTemplateCode() {
        return templateCode;
    }

    public void setTemplateCode(String templateCode) {
        this.templateCode = templateCode;
    }

    public String getTestCode() {
        return testCode;
    }

    public void setTestCode(String testCode) {
        this.testCode = testCode;
    }

    public List<String> getTest_in() {return test_in;}

    public void setTest_in(List<String> test_in) {this.test_in = test_in;}

    public List<String> getTest_out() {
        return test_out;
    }

    public void setTest_out(List<String> test_out) {
        this.test_out = test_out;
    }

    @Override
    public String toString() {
        return "Problem{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", level='" + level + '\'' +
                ", description='" + description + '\'' +
                ", templateCode='" + templateCode + '\'' +
                ", testCode='" + testCode + '\'' +
                ", test_in='" + test_in + '\'' +
                ", test_out='" + test_out + '\'' +
                '}';
    }
}
