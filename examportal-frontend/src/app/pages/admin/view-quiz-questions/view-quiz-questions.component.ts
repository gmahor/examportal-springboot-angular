import { QuestionService } from './../../../services/question-service/question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions: any = [];

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _router: Router) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;

    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          text: 'Server is not responsing. Pls check the server again...',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }


  // delete quiz questions
  public quizQuestion(quesId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are You Sure ? Want To Delete This Question..'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(quesId).subscribe(
          (data) => {
            Swal.fire({
              title: 'Question Deleted Successfully...',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            }).then((e: any) => {
              setTimeout(function () { window.location.reload() }, 3000);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Something Went Wrong Question Is Not Deleted..',
              icon: 'error',
              showConfirmButton: false,
              timer: 3000
            });
          }
        );
      }
    });



  }



}
