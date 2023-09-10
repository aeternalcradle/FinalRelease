package com.hao.pojo;

import lombok.Getter;
import lombok.Setter;

/**
 * @author: haozhang
 * @Date: 2021/1/5 10:12
 */
@Getter
@Setter
public class Admin {
    private String username;
    private String password;

    private int ismanager;

    public Admin() {
    }

    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
