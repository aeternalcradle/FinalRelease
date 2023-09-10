package com.hao.mapper;

import com.hao.pojo.UserAnswer;
import com.hao.pojo.UserPassCount;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserAnswerMapper {
    Integer checkUserAnswerExists(@Param("user_name") String user_name, @Param("problem_id") int problem_id);

    void updateUserAnswerSuccess(@Param("id") Integer id);

    void updateUserAnswerFail(@Param("id") Integer id);

    void addUserAnswer(@Param("user_name") String user_name,@Param("problem_id") int problem_id ,@Param("pass_count") int pass_count ,@Param("total_count") int total_count);

    List<UserAnswer> selectMyAnswer(@Param("user_name") String user_name);

    @Select("SELECT user_name, COUNT(*) as pass_count_records " +
            "FROM user_answer " +
            "WHERE pass_count <> 0 " +
            "GROUP BY user_name " +
            "ORDER BY pass_count_records DESC")
    List<UserPassCount> getUserPassCounts();
}
