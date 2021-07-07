package com.examportal.examportalbackend.dao;

import java.util.List;

import com.examportal.examportalbackend.entity.exam.Category;
import com.examportal.examportalbackend.entity.exam.Quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface QuizRepo extends JpaRepository<Quiz, Long> {

    @Transactional
    @Modifying
    @Query("delete from Quiz where q_id = :qid ")
    public void deleteQuiz(@Param("qid") Long qid);

    public List<Quiz> findBycategory(Category category);

    public List<Quiz> findByActive(Boolean b);

    public List<Quiz> findByCategoryAndActive(Category category, Boolean b);

}
