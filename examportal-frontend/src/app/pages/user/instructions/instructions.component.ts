import { timer } from 'rxjs';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId: any;

  quiz: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qId).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do You Want To Start The Quiz ",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Start',
      timer: 5000,
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qId]);
      }
    })
  }

}
