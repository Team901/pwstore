package com.example.sudi.controller;

import com.example.sudi.modal.MyPasswordStore;
import com.example.sudi.modal.User;
import com.example.sudi.repository.MypasswordStoreRepository;
import com.example.sudi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;

@RestController
@RequestMapping("/app")
public class AppController {
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MypasswordStoreRepository mypasswordStoreRepository;

    private ArrayList arrayList;
    /*@RequestMapping("/sss")
    public List<User> test(){
        List<User> list = userRepository.findAll();
        return list;
    }
    @RequestMapping("/fff")
    public String fff(){
        return "{'sdfs':'gh'}";
    }
    @RequestMapping("/douyu")
    public String douyu(){
        String test = "https://www.douyu.com/";
        String douyu = this.restTemplate.getForEntity("https://www.douyu.com/t/mastercoming",String.class).getBody();
        douyu.replaceAll("search_info/getTop","https://www.douyu.com/search_info/getTop");
        douyu.replaceAll("lapi/sign/web/getinfo","https://www.douyu.com/lapi/sign/web/getinfo");
        return douyu;
    }
    @RequestMapping("weibo")
    public String weibo(){
        String weibo = this.restTemplate.getForEntity("https://weibo.com/",String.class).getBody();
        return weibo;
    }*/
    @RequestMapping("/saveApps")
    public ArrayList saveApps(HttpServletRequest request){
        arrayList = new ArrayList();
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        MyPasswordStore myPasswordStore;
//        String app = request.getParameter("app");
        String name = request.getParameter("name");
        String pw = request.getParameter("pw");
        String[] names = name.split(",");
        String[] pws = pw.split(",");
        for(int i=0;i<names.length;i++){
            myPasswordStore = new MyPasswordStore();
            myPasswordStore.setUserId(user.getId());
            myPasswordStore.setCreateTime(new Date().toString());
            myPasswordStore.setName(names[i]);
            myPasswordStore.setPw(pws[i]);
            mypasswordStoreRepository.save(myPasswordStore);
            arrayList.add(1);
        }
        return arrayList;
    }
    @RequestMapping("/deleteApp")
    public ArrayList deleteApp(HttpServletRequest request){
        arrayList = new ArrayList();
        HttpSession session = request.getSession();
        String id = request.getParameter("id");
        mypasswordStoreRepository.deleteById(id);
        return arrayList;
    }
}
