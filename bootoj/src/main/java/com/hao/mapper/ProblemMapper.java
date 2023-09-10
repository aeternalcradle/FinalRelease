package com.hao.mapper;

import com.hao.pojo.Problem;
import com.hao.pojo.TestCase;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author haozhang
 */
@Mapper
@Repository
public interface ProblemMapper {
    /**
     * 查询所有题目
     * @return
     */
    List<Problem> queryAllList();

    /**
     * 查询一个题目
     * @param id
     * @return
     */
    Problem queryOne(@Param("id") Integer id);

    /**
     * 插入一个题目
     * @param problem
     * @return
     */
    int insertProblem(Problem problem);

    /**
     * 删除一道题目
     * @param id
     * @return
     */
    int deleteProblem(@Param("id") Integer id);


    int updateProblem(Problem problem);

    /**
     * 管理员更新时某道题目时展示给管理员的页面
     * @param id
     * @return
     */
    Problem queryOneProblemToAdmin(Integer id);

    List<TestCase> getTestCaseByProblemId(int id);

    int addTestCase(TestCase testCase);

    int deleteTestcasesByProblemId(int id);
}
