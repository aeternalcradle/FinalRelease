package com.hao.mapper.judge;

import com.hao.pojo.Problem;
import com.hao.pojo.judge.JudgeProblem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface JudgeProblemMapper {
    JudgeProblem queryOne(@Param("id") Integer id);

    List<JudgeProblem> queryAllList();

    int insertJudgeProblem(JudgeProblem judgeProblem);

    int deleteJudgeProblem(@Param("id") Integer id);

    int updateJudgeProblem(Map<Object, Object> map);

    JudgeProblem queryOneProblemToAdmin(Integer id);
}
