package com.examportal.examportalbackend.service;

import java.util.List;

import com.examportal.examportalbackend.dao.QuestionRepo;
import com.examportal.examportalbackend.entity.exam.Question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepo questionRepo;

    // add question
    public Question addQuestion(Question question){
        return this.questionRepo.save(question);
    }

    // update questions
    public Question updateQuestion(Question question){
        return this.questionRepo.save(question);
    }

    // get all questions
    public List<Question> getAllQuestions(){
        return this.questionRepo.findAll();
    }

    // get question by id
    public Question getQuestionById(Long questionId){
        return this.questionRepo.findById(questionId).get();
    }

    // delete question by id
    public void deleteQuestionById(Long questionId){
         this.questionRepo.deleteById(questionId);
    }

}
