package com.examportal.examportalbackend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.examportal.examportalbackend.entity.Role;
import com.examportal.examportalbackend.entity.User;
import com.examportal.examportalbackend.entity.UserRole;
import com.examportal.examportalbackend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Create User
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(42L);
        role.setRoleName("ADMIN");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        String encode = this.bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encode);

        return this.userService.createUser(user, roles);
    }

    // Get All Users
    @GetMapping("/allusers")
    public List<User> allUsers() {
        return this.userService.findAll();
    }

    // Get User By Username
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        return this.userService.getUserByUsername(username);
    }

    @DeleteMapping("/{userid}")
    public void deleteUser(@PathVariable("userid") Long userId) {
        this.userService.deleteUserById(userId);
    }

}
