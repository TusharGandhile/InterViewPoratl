import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  nid:any
  check:any
  ans:any
  correctAnswer:any
  correct:any=0;
  counter=0;
  testStarted=0;
  newarr:any=[]
  alltests:any=[]
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    localStorage.removeItem('currentQuestion')
  
    if(localStorage.getItem("counter")){
      this.counter=JSON.parse(localStorage.getItem("counter")!)
     // console.log( this.ans);
     this.counter++;
     localStorage.setItem("counter", JSON.stringify(this.counter))
    } 
    
if(localStorage.getItem("ans")){
  this.ans=JSON.parse(localStorage.getItem("ans")!)
  console.log( this.ans);
}
if(localStorage.getItem("newarr")){
  this.newarr=JSON.parse(localStorage.getItem("newarr")!)
  
}
if(localStorage.getItem("correctAnswer")){
  this.correctAnswer=JSON.parse(localStorage.getItem("correctAnswer")!)
  console.log( this.correctAnswer);
  
}
    this.route.params.subscribe(data =>{
      //console.log(data);
      this.nid=data;
    })
//('http://interviewapi.ngminds.com/getQuizData')
    this.http.get<any>('https://dip-kaluse.github.io/examport/portal.json').subscribe((res: any) => {
      this.alltests=res.tests;
      for (let i = 0; i < res.tests.length; i++) {
        if(res.tests[i]._id == this.nid.id){
          this.check=res.tests[i];
        }
      }
      
      this.ans=[]
        for(let i=0;i< this.check.questions.length;i++)(this.check.questions[i].type=='Multiple-Response')?this.ans.push([null,null]):this.ans.push(null)
        localStorage.setItem('ans',JSON.stringify(this.ans))
          
       for(let i=0;i< this.newarr.length;i++)(this.check._id== this.newarr[i].id)?this.newarr[i].ans=this.ans:""
         localStorage.setItem('newarr',JSON.stringify(this.newarr))
 
   });
 
    for(let i=0;i< this.correctAnswer.length;i++){ 
      
       if(JSON.stringify(this.ans[i])==JSON.stringify(this.correctAnswer[i])){
      console.log("hi");
      
      this.correct++
      
    }
   
    }
  }

}
