package com.example.sudi.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/test")
public class Text {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("/baidu")
    public String baidu(HttpServletRequest request, HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        String baidu = this.restTemplate.getForEntity("https://www.baidu.com/",String.class).getBody();
        baidu = baidu.replace("<head>","<head><meta charset='UTF-8'>");
        return baidu;
    }
}
