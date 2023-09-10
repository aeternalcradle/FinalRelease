package com.hao.interceptor;

import com.hao.pojo.Admin;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author: haozhang
 * @Date: 2021/2/4 12:08
 */
public class LoginInterceptor implements HandlerInterceptor {

//    /**
//     * 这个方法是在访问接口之前执行的，我们只需要在这里写验证登陆状态的业务逻辑，
//     * 就可以在用户调用指定接口之前验证登陆状态了
//     * @param request
//     * @param response
//     * @param handler
//     * @return
//     * @throws Exception
//     */
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        //每一个项目对于登陆的实现逻辑都有所区别，我这里使用最简单的Session提取User来验证登陆。
//        HttpSession session = request.getSession();
//        //这里的User是登陆时放入session的,如果session中没有user，表示没登陆
//        Admin admin = (Admin) request.getSession().getAttribute("admin");
//        System.out.println("preHandle----" + admin + " ::: " + request.getRequestURL());
//
//        if (admin == null) {
//            request.setAttribute("msg","无权限请先登录");
//            // 获取request返回页面到登录页
//            request.getRequestDispatcher("/login").forward(request, response);
//            //response.sendRedirect("/login");
//            return false;
//        } else {
//            //如果session里有user，表示该用户已经登陆，放行，用户即可继续调用自己需要的接口
//            System.out.println("进入拦截器......");
//            System.out.println(request.getRequestURL());
//            return true;
//        }
//    }
//
//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//
//    }
}
