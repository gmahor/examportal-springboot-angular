import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {


  cId: any;

  quizzes: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
  
    this._route.params.subscribe((param)=>{
      this.cId = param.catId;
      if (this.cId == 0) {
        this._quiz.getActiveQuizzes().subscribe(
          (data) => {
            this.quizzes = data;
          },
          (error) => {
            console.log(error);
          }
        );
      }else{
        this._quiz.getActiveQuizOfCategory(this.cId).subscribe(
          (data)=>{
            this.quizzes=data;
          },
          (error)=>{
            console.log(error);
          }
        );
      }
      
    })
    
  

  }

}
