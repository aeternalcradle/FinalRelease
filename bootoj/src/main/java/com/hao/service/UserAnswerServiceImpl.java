package com.hao.service;

import com.hao.mapper.ProblemMapper;
import com.hao.mapper.UserAnswerMapper;
import com.hao.pojo.MyProblem;
import com.hao.pojo.Problem;
import com.hao.pojo.UserAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserAnswerServiceImpl implements UserAnswerService{
    @Autowired
    private UserAnswerMapper userAnswerMapper;

    @Autowired
    private ProblemMapper problemMapper;

    @Override
    public void updateUserAnswer(String user_name, int problem_id, int flag) {
        Integer id = userAnswerMapper.checkUserAnswerExists(user_name, problem_id);
        if (id != null){ //有记录
            if (flag >0 ){ //评测成功
                userAnswerMapper.updateUserAnswerSuccess(id);
                System.out.println("有记录且成功");
            }else{
                userAnswerMapper.updateUserAnswerFail(id);
                System.out.println("有记录且失败");

            }
        }else{
            if (flag > 0) {
                int pass_count = 1;
                userAnswerMapper.addUserAnswer(user_name, problem_id, pass_count, 1);
                System.out.println("无记录且成功");
            }
            else{
                int pass_count = 0;
                userAnswerMapper.addUserAnswer(user_name, problem_id, pass_count, 1);
                System.out.println("无记录且失败");
            }
        }

    }

    @Override
    public List<MyProblem> getMyAnswer(String user_name){
            List<UserAnswer> userAnswers = userAnswerMapper.selectMyAnswer(user_name);
            DecimalFormat percentFormat = new DecimalFormat("#.##%");
            List<MyProblem> result = new ArrayList<>();
            for (UserAnswer userAnswer:userAnswers){
                Double pass = Double.valueOf(userAnswer.getPass_count());
                Double total = Double.valueOf(userAnswer.getTotal_count());
                Double rate = pass/total;
                String formattedValue = percentFormat.format(rate);
                Problem problem = problemMapper.queryOne(userAnswer.getProblem_id());
                MyProblem myProblem = new MyProblem(userAnswer.getProblem_id(),
                        problem.getTitle(),problem.getLevel(),userAnswer.getPass_count(),userAnswer.getTotal_count(),formattedValue);
                result.add(myProblem);
            }
            return result;
    }

}
