package com.example.sudi.repository;

import com.example.sudi.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
    User findById(String id);
    User findByLoginNameAndPassword(String loginName,String pass);
}
