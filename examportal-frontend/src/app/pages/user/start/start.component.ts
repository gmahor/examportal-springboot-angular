import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question-service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId: any;

  questions: any = null;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private locationStrategy: LocationStrategy,
    private _routes: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._routes.snapshot.params.qid;
    this.loadQuestiions();
  }

  loadQuestiions() {
    this._question.getQuestionOfQuizFoeTest(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();

      },
      (error) => {
        console.log(error);
      }
    );
  }


  preventBackButton() {
    history.pushState(null, location.href, null);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, location.href, null);
    });
  }


  submitQuiz() {
    Swal.fire({
      text: "Do You Want To Submit The Quiz ",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Done',
      timer: 5000,
      timerProgressBar: true
    }).then((e: any) => {
      if (e.isConfirmed) {
        // calculation 
        this.evalQuiz();
      }
    });
  }


  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }


  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }

  evalQuiz() {
    this.isSubmit = true;
    this.questions.forEach((q: any) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswer++
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }
      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    console.log("Correct Answers " + this.correctAnswer);

    console.log("Marks Got " + this.marksGot);
    console.log("Attempted " + this.attempted);


  }

}
