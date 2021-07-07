import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  // all quizzes
  public allQuizzes() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  // delete quiz
  public deleteQuiz(id:any){
    return this.http.delete(`${baseUrl}/quiz/`+id);
  }

  // get single quiz
  public getQuiz(id:any){
    return this.http.get(`${baseUrl}/quiz/${id}`);
  }

  // update quiz
  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  // get quizzes by category
  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  // get active quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  // get active quizzes of category
  public getActiveQuizOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

}
