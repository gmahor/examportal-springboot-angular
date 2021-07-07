import { Routes, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quiz: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: ''
    }

  }

  categories: any = [];

  constructor(private category: CategoryService, private _quiz: QuizService, private route: Router) { }

  ngOnInit(): void {

    this.category.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire({
          // title: 'error',
          text: 'Error in loading data from server',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    );

  }

  formSubmit() {

    this._quiz.addQuiz(this.quiz).subscribe(
      (data: any) => {
        this.route.navigate(['admin/view-quizzes']);
        Swal.fire({
          text: 'Quiz Added Successfully..',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
      },
      (error) => {
        Swal.fire({
          text: 'Quiz Is Not Added..',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    );

  }

}
