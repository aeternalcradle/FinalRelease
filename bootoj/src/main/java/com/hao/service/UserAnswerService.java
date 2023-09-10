package com.hao.service;

import com.hao.pojo.MyProblem;

import java.util.List;

public interface UserAnswerService {
    void updateUserAnswer(String user_name, int problem_id, int flag);

    List<MyProblem> getMyAnswer(String user_name);
}
