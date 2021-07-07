import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }


  // get all question respect quiz
  public getQuestionOfQuiz(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }
  // get question by quiz id
  public getQuestionOfQuizFoeTest(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  // add question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }


  // delete question
  public deleteQuestion(quesId: any) {
    return this._http.delete(`${baseUrl}/question/${quesId}`)
  }

  // get single question
  public singleQuestion(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  // update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }
}
