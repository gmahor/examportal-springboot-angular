import { QuestionService } from './../../../services/question-service/question.service';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId: any;
  qTitle: any;

  question: any = {
    content: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    quiz: {
      qid: ""
    },
  }


  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.question.quiz.qid = this.qId
    this.qTitle = this._route.snapshot.params.title
  }


  public formSubmit() {
    this._question.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire({
          text: "Question Addded Successfull..",
          icon: 'success',
          timer: 3000,
          showConfirmButton:false
        }).then((e: any) => {
          this._router.navigate(['admin/view-questions/'+this.qId+'/'+this.qTitle]);
        });
      },
      (error) => {
        Swal.fire({
          text: "Question Not Added Try Again !!",
          icon: "error",
          timer: 3000,
          showConfirmButton:false
        })
      }
    );

  }

}
