package com.examportal.examportalbackend.dao;

import com.examportal.examportalbackend.entity.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepo extends JpaRepository<UserRole, Long> {

}
