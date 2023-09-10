package com.hao.util;

import org.springframework.cglib.beans.BeanMap;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: haozhang
 * @Date: 2021/1/6 13:31
 */
public class PojoToMapUtils {
    private static Map<Object, Object> map = new HashMap<>();
    public static <T> Map<Object, Object> pojoToMap(T t) {
        map.clear();
        BeanMap beanMap = BeanMap.create(t);
        for (Object key : beanMap.keySet()) {
            map.put(key, beanMap.get(key));
        }
        return map;
    }
}
