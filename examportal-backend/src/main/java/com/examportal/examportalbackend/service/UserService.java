package com.examportal.examportalbackend.service;

import java.util.List;
import java.util.Set;

import com.examportal.examportalbackend.dao.RoleRepo;
import com.examportal.examportalbackend.dao.UserRepo;
import com.examportal.examportalbackend.entity.User;
import com.examportal.examportalbackend.entity.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    // Create User
    public User createUser(User user, Set<UserRole> roles) throws Exception {

        User local = this.userRepo.findByUsername(user.getUsername());

        if (local != null) {
            System.out.println("User is already there....");
            throw new Exception("User Already present");
        } else {
            for (UserRole ur : roles) {
                this.roleRepo.save(ur.getRole());
            }
            user.getUserRoles().addAll(roles);
            local = this.userRepo.save(user);
        }
        return local;
    }

    // All Users
    public List<User> findAll() {
        return this.userRepo.findAll();
    }

    // Get User By Username
    public User getUserByUsername(String username) {
        return this.userRepo.findByUsername(username);
    }

    public void deleteUserById(Long userId) {
        this.userRepo.deleteById(userId);
    }

}
