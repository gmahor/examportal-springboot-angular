package com.examportal.examportalbackend.dao;

import com.examportal.examportalbackend.entity.exam.Question;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question,Long>{
    
}
