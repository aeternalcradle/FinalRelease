package com.hao.mapper;

import com.hao.pojo.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @author haozhang
 */
@Mapper
@Repository
public interface AdminMapper {
    /**
     * 查询管理员
     * @param username
     * @return
     */
    Admin getAdminByName(String username);

    int addAdmin(Admin admin);

    Boolean isUsernameExists(Admin admin);
}
