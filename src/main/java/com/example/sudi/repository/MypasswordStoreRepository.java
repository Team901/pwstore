package com.example.sudi.repository;

import com.example.sudi.modal.MyPasswordStore;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface MypasswordStoreRepository extends JpaRepository<MyPasswordStore,String> {
    List findByUserId(String userId);
    @Transactional
    void deleteById(String id);
}
