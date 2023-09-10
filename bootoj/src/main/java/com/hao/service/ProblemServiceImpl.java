package com.hao.service;

import com.hao.mapper.ProblemMapper;
import com.hao.mapper.UserAnswerMapper;
import com.hao.pojo.Problem;
import com.hao.pojo.TestCase;
import com.hao.pojo.UserPassCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class ProblemServiceImpl implements ProblemService {



    @Autowired
    private ProblemMapper problemMapper;

    @Autowired
    private UserAnswerMapper userAnswerMapper;

    public void setProblemMapper(ProblemMapper problemMapper) {
        this.problemMapper = problemMapper;
    }

    @Override
    public List<Problem> queryAllList() {
        return problemMapper.queryAllList();
    }

    @Override
    public Problem queryOne(Integer id) {
        return problemMapper.queryOne(id);
    }

    @Override
    public int insertProblem(Problem problem) {
        return problemMapper.insertProblem(problem);
    }

    @Override
    public int deleteProblem(Integer id) {
        return problemMapper.deleteProblem(id);
    }

    @Override
    public int updateProblem(Problem problem) {
        return problemMapper.updateProblem(problem);
    }

    @Override
    public Problem queryOneProblemToAdmin(Integer id) {
        return problemMapper.queryOneProblemToAdmin(id);
    }

    @Override
    public List<TestCase> getTestCaseByProblemId(int id){
        return problemMapper.getTestCaseByProblemId(id);
    }

    @Override
    public int addTestCase(TestCase testCase){
        return problemMapper.addTestCase(testCase);
    }

    @Override
    public int deleteTestcasesByProblemId(int id){
        return problemMapper.deleteTestcasesByProblemId(id);
    }

    @Override
    public List<UserPassCount> getUserPassCount(){return userAnswerMapper.getUserPassCounts();}
}
