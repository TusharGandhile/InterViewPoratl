import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  nid:any=0;
  addquestions:any=[];
  val:any;
  Alltests:any=[];
  questions:any=[];
  correctoption=[];
  options:any=[];
  tests:any=[];
  answers:any;
  ans:any=[];
  currentQuestion:number=0;
  correctAnswer:any=[];
  testcount:any=[];
  check:any;
  counter=0;
  previous=false;
  testStarted=0;
  newarr:any=[]
  alltests:any=[]
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }
radio:any= document.getElementsByClassName('radio');
checkbox:any= document.getElementsByClassName('checkbox');
 

  ngOnInit(): void {

    
    if(localStorage.getItem("currentQuestion")){
      this.currentQuestion=JSON.parse(localStorage.getItem("currentQuestion")!)
     } 
     
    if(localStorage.getItem("counter")){
      this.counter=JSON.parse(localStorage.getItem("counter")!)
     } 
     if(localStorage.getItem("newarr")){
      this.newarr=JSON.parse(localStorage.getItem("newarr")!)



     } 
    
     
    if(this.counter>0){
      this.router.navigate(['/home'])
    }
    

//localStorage.setItem("counter", JSON.stringify(this.counter=0))
    this.route.params.subscribe(data =>{
      this.nid=data;
      console.log(data);      
    })
   localStorage.setItem('nid',JSON.stringify(this.nid.id))
//('http://interviewapi.ngminds.com/getQuizData')
    this.http.get<any>('https://dip-kaluse.github.io/examport/portal.json').subscribe((res: any) => {
      this.alltests=res.tests;
      
   for (let i = 0; i < res.tests.length; i++) {
      
    if(res.tests[i]._id == this.nid.id){
      this.check=res.tests[i];
      console.log(this.check)
      console.log(this.check.questions[i]._id)
      this.tests= this.check.name;
      this.questions= this.check.questions;
      this.correctoption= this.questions[this.currentQuestion].correctOptionIndex;
     this.options= this.questions[this.currentQuestion].options;
    }
   }
   if(localStorage.getItem("newarr")){
    this.newarr=JSON.parse(localStorage.getItem("newarr")!)
    for (let i = 0; i <  this.newarr.length; i++) {
      if(this.newarr[i].id==this.check._id){

        this.ans= this.newarr[i].ans

      }
      localStorage.setItem("ans", JSON.stringify(this.ans))
      
      }
     } 
   
     if(localStorage.getItem("ans")){
      this.ans=JSON.parse(localStorage.getItem("ans")!)
      
    }else{
      for(let i=0;i< this.check.questions.length;i++){
      if(this.check.questions[i].type=='Multiple-Response'){
        this.ans.push([null,null])
      }
      else{
        this.ans.push(null)

      }
      // this.newarr.ans=this.ans;
      // console.log(this.newarr);
      localStorage.setItem("ans", JSON.stringify(this.ans))
      localStorage.setItem("newarr", JSON.stringify(this.newarr))
    
    }
     }
    for(let i=0;i< this.check.questions.length;i++){
      console.log(this.check.questions[i]._id)
            this.correctAnswer.push(this.check.questions[i].correctOptionIndex)
          
          }
            localStorage.setItem("correctAnswer", JSON.stringify(this.correctAnswer))
       });
    }

  nextQuestion(){
    this.currentQuestion++;
    // for(let i=0;i< this.check.questions.length;i++){
    //   console.log(this.check.questions[i]._id)}
    localStorage.setItem('currentQuestion',JSON.stringify(this.currentQuestion))
    this.answer()
  }

  prevQuestion(){
    if(this.check.questions[this.currentQuestion].type=='Multiple-Response'){
      let carr:any=[]
   
     for (let j = 0; j < this.checkbox.length; j++) {
      if (this.checkbox[j].checked==true) {   
       // console.log(j)
               carr.push(j);
        
      }        
     }
     this.ans[this.currentQuestion]=carr
     localStorage.setItem("ans", JSON.stringify(this.ans))

     }
     else{
       let carr:any
       for (let j = 0; j < this.radio.length; j++) {
         if (this.radio[j].checked==true) {   
         //  console.log(j);
                  carr=j   ;
           }        
        }
        this.ans[this.currentQuestion]=carr
        localStorage.setItem("ans", JSON.stringify(this.ans))
       
         for(let i=0;i<this.alltests.length;i++){
         if(this.check._id == this.newarr[i]?.id){
        this.newarr[i].ans=this.ans;
        console.log(this.newarr[i].ans)
      }
      }
      localStorage.setItem("newarr", JSON.stringify(this.newarr))
     }
     this.currentQuestion--;
     localStorage.setItem('currentQuestion',JSON.stringify(this.currentQuestion))
     localStorage.setItem("ans", JSON.stringify(this.ans))
    }

  answer(){

    if(this.check.questions[this.currentQuestion-1].type=='Multiple-Response'){
       let carr:any=[]
    
      for (let j = 0; j < this.checkbox.length; j++) {
       if (this.checkbox[j].checked==true) {   
      //   console.log(j)
                carr.push(j);
         
       }        
      }
      this.ans[this.currentQuestion-1]=carr
      localStorage.setItem("ans", JSON.stringify(this.ans))

      }
      else{
        let carr:any
        for (let j = 0; j < this.radio.length; j++) {
          if (this.radio[j].checked==true) {   
         //   console.log(j);
                   carr=j   ;
            }        
         }
         this.ans[this.currentQuestion-1]=carr
         localStorage.setItem("ans", JSON.stringify(this.ans))
         
       // console.log ( this.newarr[0].id+"  "+this.check._id)
         
             for(let i=0;i<this.alltests.length;i++){
            if(this.check._id == this.newarr[i]?.id){
        this.newarr[i].ans=this.ans;
        console.log(this.newarr[i].ans)
        }
        }
        localStorage.setItem("newarr", JSON.stringify(this.newarr))
        }
        }
  finishtest(){
    if(this.check.questions[this.currentQuestion].type=='Multiple-Response'){
      let carr:any=[]
   
     for (let j = 0; j < this.checkbox.length; j++) {
      if (this.checkbox[j].checked==true) {   
     //   console.log(j)
               carr.push(j);
        }        
     }
     this.ans[this.currentQuestion]=carr
     localStorage.setItem("ans", JSON.stringify(this.ans))

     }
     else{
       let carr:any
       for (let j = 0; j < this.radio.length; j++) {
         if (this.radio[j].checked==true) {   
        //   console.log(j)
                  carr=j   
            }        
        }
        this.ans[this.currentQuestion]=carr;
        localStorage.setItem("ans", JSON.stringify(this.ans))
       }
     this.router.navigate(['/finish/',this.nid.id])
     localStorage.setItem("counter", JSON.stringify(this.counter))
     localStorage.setItem("currentQuestion", JSON.stringify(this.currentQuestion=0))
     
  }

}
