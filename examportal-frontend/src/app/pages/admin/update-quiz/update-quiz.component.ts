import { CategoryService } from './../../../services/category-service/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId: any = 0;

  quiz: any;

  categories: any = [];


  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router,
  ) { }

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

    this._cat.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log("Category Not Loaded...");
      }
    );
  }

  public submitUpdateForm() {

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire({
          text: "Quiz Updated Successfull..",
          icon: 'success',
          timer: 3000,
          showCloseButton: false
        }).then((e: any) => {
          this._router.navigate(['admin/view-quizzes']);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
