package com.examportal.examportalbackend.controller;

import java.security.Principal;

import com.examportal.examportalbackend.config.UserDetailsServiceImple;
import com.examportal.examportalbackend.dao.UserRepo;
import com.examportal.examportalbackend.entity.User;
import com.examportal.examportalbackend.jwt.JwtRequest;
import com.examportal.examportalbackend.jwt.JwtResponse;
import com.examportal.examportalbackend.jwt.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImple userDetailsServiceImple;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo; 

    // /generate-token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {

        try {
            this.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User not found");
        }

        // user is authenticated successfully

        UserDetails userDetails = this.userDetailsServiceImple.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtil.generateToken(userDetails);

        System.out.println("Token Generated Successfully..");

        return ResponseEntity.ok(new JwtResponse(token));
    }

    // done authenticate
    // if not authenticate then error
    private void authenticate(String username, String password) throws Exception {

        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        } catch (DisabledException e) {

            throw new Exception("USER DISABLED " + e.getMessage());

        } catch (BadCredentialsException e) {

            throw new Exception("Invalid Credentials " + e.getMessage());

        }

    }

    // return the details of current login user
    @GetMapping("/current-user")
    public User getCurrentUser(Principal p){
        User user = this.userRepo.findByUsername(p.getName());
        return user;
    }



}
