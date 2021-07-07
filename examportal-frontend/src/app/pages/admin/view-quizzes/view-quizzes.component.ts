
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {


  quizzes: any = [];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.allQuizzes().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire({
          text:"Sever Can't Response. Pls Check Your Serve..",
          icon:'error',
          timer:3000,
          showConfirmButton:false
        });
      }
    );
  }

  // get single quiz
  singleQuiz(qid: any) {
    console.log(qid);
  }

  // delete quiz
  public deleteQuiz(id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Do You Want To Delete The Quiz ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(id).subscribe(
          (date) => {
            Swal.fire({
              icon: 'success',
              text: 'Quiz Deleted Successfully...',
              timer: 3000,
              showConfirmButton: false,
            });
            setTimeout(function () { window.location.reload() }, 3000);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          }
        )
      }
    })
  };


}

