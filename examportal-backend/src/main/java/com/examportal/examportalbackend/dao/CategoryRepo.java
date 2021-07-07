package com.examportal.examportalbackend.dao;

import com.examportal.examportalbackend.entity.exam.Category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Long> {
    
}
