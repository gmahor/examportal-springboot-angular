package com.examportal.examportalbackend.service;

import java.util.List;

import com.examportal.examportalbackend.dao.QuizRepo;
import com.examportal.examportalbackend.entity.exam.Category;
import com.examportal.examportalbackend.entity.exam.Quiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    private QuizRepo quizRepo;

    // add quiz
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    // update quiz
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    // get all quizzes
    public List<Quiz> getAllQuizzes() {
        return this.quizRepo.findAll();
    }

    // get quiz by id
    public Quiz getQuizById(Long quizId) {
        return this.quizRepo.findById(quizId).get();
    }

    // delete quiz by id
    public void deleteQuiz(Long quizId) {
        this.quizRepo.deleteQuiz(quizId);
    }

    // get quizzes by category
    public List<Quiz> getQuizzesOfCategory(Category category){
        return this.quizRepo.findBycategory(category);
    }


    public List<Quiz> getActiveQuizzes(){
        return this.quizRepo.findByActive(true);
    }

    public List<Quiz> getActiveQuizzesOfCategory(Category category){
        return this.quizRepo.findByCategoryAndActive(category, true);
    }



}
