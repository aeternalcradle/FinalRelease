package com.hao.service;

import com.hao.pojo.Admin;
import com.hao.pojo.TestCase;

import java.util.List;

public interface AdminService {
    /**
     * 查询管理员
     * @param username
     * @return
     */
    Admin getAdminByName(String username);

    int addAdmin(Admin admin);

    Boolean isUsernameExists(Admin admin);

}
