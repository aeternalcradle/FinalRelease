package com.hao.controller;

import com.hao.pojo.*;
import com.hao.service.AdminService;
import com.hao.service.ProblemService;
import com.hao.util.HttpBodyHandlerUtils;
import com.hao.util.PojoToMapUtils;
import com.hao.util.ServerResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;




@RestController
@CrossOrigin
@Async
public class AdminController {
    /**
     * ok = 1 表示密码正确
     */
    static class LoginResponse {
        String name;
        String reason;
        int ok;
        int ismanager;

        HttpSession session;
    }

    @Autowired
    private ProblemService problemService;

    @Autowired
    private AdminService adminService;

    @RequestMapping("/manage")
    public String manage() {
        return "login";
    }

    @PostMapping("/register")
    @ResponseBody
    public int  register(HttpServletRequest request){
        String body = HttpBodyHandlerUtils.readBody(request);
        System.out.println("login_body: \n" + body);
        Admin admin = HttpBodyHandlerUtils.stringToPojo(body, Admin.class);
        if (adminService.isUsernameExists(admin)){
            return -1;
        }
        else {
            int response = adminService.addAdmin(admin);
            return response;
        }


    }


    @PostMapping("/login")
    @ResponseBody
    public String login(HttpServletRequest request) {
        String body = HttpBodyHandlerUtils.readBody(request);
        System.out.println("login_body: \n" + body);
        Admin admin = HttpBodyHandlerUtils.stringToPojo(body, Admin.class);
        System.out.println("admin: \n" + admin);
        Admin daoAdmin = adminService.getAdminByName(admin.getUsername());
        if (daoAdmin == null || !daoAdmin.getPassword().equals(admin.getPassword())) {
            return ServerResponseUtil.serverResponse(0, "用户名或密码错误");
        } else {
            HttpSession session = request.getSession(true);
            session.setAttribute("admin", daoAdmin);
            session.setMaxInactiveInterval(120 * 60);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.ok = 1;
            loginResponse.reason = "";
            loginResponse.name = daoAdmin.getUsername();
            loginResponse.ismanager = daoAdmin.getIsmanager();
            return HttpBodyHandlerUtils.pojoToString(loginResponse);
        }
    }



    @PostMapping("/checkLogin")
    @ResponseBody
    public String checkLogin(HttpServletRequest request) throws UnsupportedEncodingException {
        HttpSession session = request.getSession(false);
        System.out.println("request\n");
        if (session == null) {
            System.out.println(session);
            return ServerResponseUtil.serverResponse(0, "您还未登录");
        } else {
            Admin admin = (Admin) session.getAttribute("admin");
            System.out.println("用户");
            System.out.println(admin);

            if (admin == null) {
                System.out.println("admin=0");
                return ServerResponseUtil.serverResponse(0, "您还未登录");
            } else {
                LoginResponse loginResponse = new LoginResponse();
                loginResponse.ok = 1;
                loginResponse.reason = "";
                loginResponse.name = admin.getUsername();
                return HttpBodyHandlerUtils.pojoToString(loginResponse);
            }
        }
    }

    @GetMapping("/rank")
    public List<UserPassCount> getUserPassCount(){
        return problemService.getUserPassCount();
    }

    @PostMapping("/add")
    @ResponseBody
    public String admin(HttpServletRequest request) {
        /*HttpSession session = request.getSession(false);
        if (session == null) {
            return ServerResponseUtil.serverResponse(0, "您还未登录");
        } else {
            Admin admin = (Admin) session.getAttribute("user");
            if (admin == null) {
                return ServerResponseUtil.serverResponse(0, "您还未登录");
            } else {*/
                String body = HttpBodyHandlerUtils.readBody(request);
                System.out.println("add_body: \n" + body);
                if (!HttpBodyHandlerUtils.isComplete(body)) {
                    return ServerResponseUtil.serverResponse(0, "请录入完整的Problem再提交");
                } else {
                    Problem problem = HttpBodyHandlerUtils.stringToPojo(body, Problem.class);
                    System.out.println("add_problem: \n" + problem);
                    List<Problem> list = problemService.queryAllList();
                    if (problem.getId() <= list.size()) {
                        return ServerResponseUtil.serverResponse(0, "请录入正确的id值");
                    } else {
                        int i = problemService.insertProblem(problem);
                        List<String> test_ins = problem.getTest_in();
                        int nums = 0;
                        for(String test_in:test_ins) {
                            String test_out = problem.getTest_out().get(nums);
                            TestCase testCase = new TestCase(problem.getId(), test_in, test_out);
                            int j = problemService.addTestCase(testCase);
                            nums++;
                        }
                        System.out.println(i);
                        LoginResponse loginResponse = new LoginResponse();
                        loginResponse.ok = i;
                        loginResponse.reason = "";
                        /*loginResponse.name = admin.getUsername();*/
                        return HttpBodyHandlerUtils.pojoToString(loginResponse);
                    }
               /* }
            }*/
        }
    }

    @PostMapping("/all")
    @ResponseBody
    public String adminAll() {
        return HttpBodyHandlerUtils.pojoToString(problemService.queryAllList());
    }

    @PostMapping("/delete")
    @ResponseBody
    public String deleteProblem(Integer id, HttpServletRequest request) {
        System.out.println("删除题目ID：" + id);
        HttpSession session = request.getSession(false);
        /*if (session == null) {
            return ServerResponseUtil.serverResponse(0, "您还未登录");
        } else {
            Admin admin = (Admin) session.getAttribute("admin");
            if (admin == null) {
                return ServerResponseUtil.serverResponse(0, "您还未登录");
            } else {*/

        int i = problemService.deleteProblem(id);
                if (i == 0) {
                    LoginResponse loginResponse = new LoginResponse();
                    loginResponse.ok = i;
                    loginResponse.reason = "没有该题目";
/*
                    loginResponse.name = admin.getUsername();
*/
                    return HttpBodyHandlerUtils.pojoToString(loginResponse);
                } else {
                    LoginResponse loginResponse = new LoginResponse();
                    loginResponse.ok = i;
                    loginResponse.reason = "";
                    int c = problemService.deleteTestcasesByProblemId(id);
                    int d = problemService.deleteTestcasesByProblemId(id);
/*
                    loginResponse.name = admin.getUsername();
*/
                    return HttpBodyHandlerUtils.pojoToString(loginResponse);
                }


    }

    @RequestMapping("/toUpdate")
    @ResponseBody
    public String toUpdate(Integer id) {
        /*HttpSession session = request.getSession(false);
        if (session == null) {
            return ServerResponseUtil.serverResponse(0, "您还未登录");
        } else {*/
            /*Admin admin = (Admin) session.getAttribute("user");
            if (admin == null) {
                return ServerResponseUtil.serverResponse(0, "您还未登录");
            } else {*/
                Problem problem = problemService.queryOneProblemToAdmin(id);
                List<TestCase>testCases = problemService.getTestCaseByProblemId(problem.getId());
                List<String> test_ins = new ArrayList<>();
                List<String> test_outs = new ArrayList<>();
            for (TestCase testCase : testCases){
                    test_ins.add(testCase.getTestIn());
                    test_outs.add(testCase.getTestOut());
            }
            ProblemAndTestcase problemAndTestcase = new ProblemAndTestcase(problem, test_ins, test_outs);
            return HttpBodyHandlerUtils.pojoToString(problemAndTestcase);
            /*}
        }*/
    }

    @PostMapping("/update")
    @ResponseBody
    public String updateProblem(Integer id,HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        /*HttpSession session = request.getSession(false);
        if (session == null) {
            return ServerResponseUtil.serverResponse(0, "您还未登录");
        } else {
            Admin admin = (Admin) session.getAttribute("user");
            if (admin == null) {
                return ServerResponseUtil.serverResponse(0, "您还未登录");
            } else {*/

                /*HttpSession session = request.getSession(false);

                Admin admin = (Admin) session.getAttribute("user");
        if (admin == null) {
            return ServerResponseUtil.serverResponse(0, "您还未登录");
        }*/

        String body = HttpBodyHandlerUtils.readBody(request);
                System.out.println("update_body: \n" + body);
                if (!HttpBodyHandlerUtils.isComplete(body)) {
                    return ServerResponseUtil.serverResponse(0, "请完整修改Problem再提交");
                } else {
                    ProblemAndTestcase problemAndTestcase = HttpBodyHandlerUtils.stringToPojo(body, ProblemAndTestcase.class);
                    /*problem.setTestCode(problem.getTestCode().replaceAll("\\\\", ""));
                    System.out.println("update_problem: \n" + problem);
                    Map<Object, Object> map = PojoToMapUtils.pojoToMap(problem);*/
                    Problem problem = HttpBodyHandlerUtils.stringToPojo(body, Problem.class);
                    System.out.println(problem);

                    int i = problemService.updateProblem(problem);
                    int j = problemService.deleteTestcasesByProblemId(problem.getId());
                    System.out.println("problem里的值"+problem.getTest_in());
                    List<String> test_ins = problem.getTest_in();
                    int nums = 0;
                    for(String test_in:test_ins) {
                        String test_out = problem.getTest_out().get(nums);
                        TestCase testCase = new TestCase(problem.getId(), test_in, test_out);
                        int k = problemService.addTestCase(testCase);
                        nums++;
                    }

                    LoginResponse loginResponse = new LoginResponse();
                    loginResponse.ok = i;
                    loginResponse.reason = "";
                    loginResponse.name = "";
/*
                    loginResponse.name = admin.getUsername();
*/
                    return HttpBodyHandlerUtils.pojoToString(loginResponse);
                }
           /* }
        }*/
    }
}
