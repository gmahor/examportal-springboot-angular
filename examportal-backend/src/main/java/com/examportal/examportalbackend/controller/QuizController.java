package com.examportal.examportalbackend.controller;

import java.util.List;

import com.examportal.examportalbackend.entity.exam.Category;
import com.examportal.examportalbackend.entity.exam.Quiz;
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
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // add quiz
    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
        try {
            Quiz myQuiz = this.quizService.addQuiz(quiz);
            return new ResponseEntity<Quiz>(myQuiz, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Quiz>(HttpStatus.BAD_REQUEST);
        }
    }

    // get all quiz
    @GetMapping("/")
    public ResponseEntity<?> getAllQuiz() {
        try {
            List<Quiz> allQuizzes = this.quizService.getAllQuizzes();
            return new ResponseEntity<>(allQuizzes, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // get quiz by id
    @GetMapping("/{qId}")
    public ResponseEntity<?> getQuizById(@PathVariable("qId") Long qId) {
        try {
            Quiz quiz = this.quizService.getQuizById(qId);
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // update quiz
    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
        try {
            Quiz updateQuiz = this.quizService.updateQuiz(quiz);
            return new ResponseEntity<>(updateQuiz, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // delete
    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") Long quizId) {
        this.quizService.deleteQuiz(quizId);
    }

    // get quiz by category
    @GetMapping("/category/{cid}")
    public ResponseEntity<?> getQuizzesOfCategory(@PathVariable("cid") Long cid) {

        try {
            Category category = new Category();
            category.setCid(cid);
            List<Quiz> quizzes = this.quizService.getQuizzesOfCategory(category);
            return new ResponseEntity<>(quizzes, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    // get active quizzes
    @GetMapping("/active")
    public ResponseEntity<?> getActiveQuizzes() {
        try {
            List<Quiz> activeQuizzes = this.quizService.getActiveQuizzes();
            return new ResponseEntity<>(activeQuizzes, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // get active quizzes of category
    @GetMapping("/category/active/{cid}")
    public ResponseEntity<?> getActiveQuizzeOfCategory(@PathVariable("cid") Long cid) {
        try {

            Category category = new Category();
            category.setCid(cid);
            List<Quiz> activeQuizzes = this.quizService.getActiveQuizzesOfCategory(category);
            return new ResponseEntity<>(activeQuizzes, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
