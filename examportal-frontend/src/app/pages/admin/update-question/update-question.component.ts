import { QuestionService } from './../../../services/question-service/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId: any;

  question: any ;

  qTitle: any;

  qId:any;

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _router:Router) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesid;
    this.qTitle = this._route.snapshot.params.title;
    this.qId= this._route.snapshot.params.qid;

    this._question.singleQuestion(this.quesId).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => {
        Swal.fire({
          icon:'warning',
          title:'Internal Server Error...',
          timer:3000,
          showConfirmButton:false
        });
      }
    );
  }

  formSubmit() {
    this._question.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Question Updated Successfully...',
          showConfirmButton: false,
          timer: 3000
        }).then((result: any) => {
          this._router.navigate(['admin/view-questions/'+this.qId+'/'+this.qTitle]);
        });
      },
      (error)=>{
        console.log(error);   
      }
    );

  }


}
