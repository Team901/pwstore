package com.example.sudi.controller;

import com.example.sudi.modal.MyPasswordStore;
import com.example.sudi.modal.User;
import com.example.sudi.repository.MypasswordStoreRepository;
import com.example.sudi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private ArrayList arrayList;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MypasswordStoreRepository mypasswordStoreRepository;




    @RequestMapping("/login")
    public ArrayList login(HttpServletRequest request){
        arrayList = new ArrayList();
        String loginName = request.getParameter("username");
        String password = request.getParameter("password");

        HttpSession session;
        User user = userRepository.findByLoginNameAndPassword(loginName,password);
        if(user != null){
            session = request.getSession();
            session.setAttribute("username",loginName);
            session.setAttribute("user",user);
            session.setMaxInactiveInterval(30 * 60);
            arrayList.add(user.getName());
            arrayList.add(user.getCount());
        }
        return arrayList;
    }

    @RequestMapping("/login/register")
    public ArrayList register(HttpServletRequest request){
        String name = request.getParameter("name");
        String login_name = request.getParameter("login_name");
        String password = request.getParameter("password");
        arrayList = new ArrayList();
        if(name.isEmpty()){
            arrayList.add("0");
            arrayList.add("姓名为空");
            return arrayList;
        }else if(login_name.isEmpty()){
            arrayList.add("0");
            arrayList.add("登陆名为空");
            return arrayList;
        }else if(password.isEmpty()){
            arrayList.add("0");
            arrayList.add("密码为空");
            return arrayList;
        }else {
            arrayList.add("1");
        }
        User user = new User();
        user.setCount("0");
        user.setCreatetime(new Date().toString());
        user.setLoginName(login_name);
        user.setName(name);
        user.setPassword(password);
        userRepository.save(user);
        HttpSession session = request.getSession();
        session.setAttribute("username",name);
        session.setAttribute("user",user);
        session.setMaxInactiveInterval(30 * 60);
        arrayList.add("注册成功");
        return arrayList;
    }

    @RequestMapping("/getUser")
    public HashMap<String,String> getUser(HttpServletRequest request){
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        HashMap<String,String> map = new HashMap<>();
        map.put("name",user.getName());
        map.put("count",user.getCount());
        return map;
    }
    @RequestMapping("/loginout")
    public ArrayList loginout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("username");
        session.removeAttribute("user");
        arrayList = new ArrayList();
        arrayList.add("success");
        return arrayList;
    }
    @RequestMapping("/getApp")
    public ArrayList getApp(HttpServletRequest request){
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        String userId = user.getId();
        arrayList = (ArrayList) mypasswordStoreRepository.findByUserId(userId);
        return arrayList;
    }
}
