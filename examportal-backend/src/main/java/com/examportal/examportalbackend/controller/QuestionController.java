package com.examportal.examportalbackend.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import com.examportal.examportalbackend.entity.exam.Question;
import com.examportal.examportalbackend.entity.exam.Quiz;
import com.examportal.examportalbackend.service.QuestionService;
import com.examportal.examportalbackend.service.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {

        try {
            Question ques = this.questionService.addQuestion(question);
            return new ResponseEntity<>(ques, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // get all question
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getAllQuestionOfQuiz(@PathVariable("qid") Long qid) {
        try {

            Quiz quiz = this.quizService.getQuizById(qid);
            Set<Question> questions = quiz.getQuestions();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // get all question of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid) {
        try {
            Quiz quiz = this.quizService.getQuizById(qid);
            Set<Question> questions = quiz.getQuestions();

            List list = new ArrayList<>(questions);
            if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
                list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
            }
            Collections.shuffle(list);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // get question by id
    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestionById(@PathVariable("questionId") Long questionId) {
        try {
            Question questionById = this.questionService.getQuestionById(questionId);
            return new ResponseEntity<>(questionById, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // update question
    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
        try {
            Question updateQuestion = this.questionService.updateQuestion(question);
            return new ResponseEntity<>(updateQuestion, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // delete question by id
    @DeleteMapping("/{questionId}")
    public void deleteQuestionById(@PathVariable("questionId") Long questionId) {
        this.questionService.deleteQuestionById(questionId);
    }

}
