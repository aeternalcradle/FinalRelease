package com.hao.service;

import com.hao.mapper.AdminMapper;
import com.hao.pojo.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author: haozhang
 * @Date: 2021/1/8 14:01
 */
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminMapper adminMapper;

    @Override
    public Admin getAdminByName(String username) {
        return adminMapper.getAdminByName(username);
    }

    @Override
    public int addAdmin(Admin admin){
        return adminMapper.addAdmin(admin);
    }

    @Override
    public Boolean isUsernameExists(Admin admin){
        return adminMapper.isUsernameExists(admin);
    }
}
