package com.hao.config;

import com.hao.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author: haozhang
 * @Date: 2021/2/4 12:02
 */
//@Configuration
public class LoginConfig implements WebMvcConfigurer {

//    /**
//     * 这个方法用来注册拦截器，我们自己写好的拦截器需要通过这里添加注册才能生效
//     * @param registry
//     */
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        // addPathPatterns("/**") 表示拦截所有的请求，
//        // excludePathPatterns("/login", "/register") 表示除了登陆与注册之外，因为登陆注册不需要登陆也可以访问
//        registry.addInterceptor(new LoginInterceptor())
//                .addPathPatterns("/add", "/all", "/delete", "toUpdate", "update")
//                .excludePathPatterns("/login", "/manage", "/oj/all", "/oj/one", "/oj/compile", "/css/**", "/js/*");
//        WebMvcConfigurer.super.addInterceptors(registry);
//    }
//
//    /**
//     * 这个方法是用来配置静态资源的，比如html，js，css，等等
//     * @param registry
//     */
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/static/**")
//                .addResourceLocations("classpath:/static/");
//        WebMvcConfigurer.super.addResourceHandlers(registry);
//    }

    /**
     * 设置默认页面
     * @param registry
     */
//    @Override
//    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/")
//                .setViewName("forward:/manage");
//        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        WebMvcConfigurer.super.addViewControllers(registry);
//    }
}
