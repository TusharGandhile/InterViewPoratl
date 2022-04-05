import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nid:any;
  addquestions:any[]=[];
  tests:any[]=[];
  options:any;
  Alltests:any=[];
  currentQuestion=0;
  correctoption:any=[];
  questions:any=[];
  testStarted=0;
  check:any;
  arr:any=[];
  corrans:any=[];
  newarr:any=[];
  counter:any
  
  constructor(private http:HttpClient ,private route:ActivatedRoute,private router:Router ) { }

  ngOnInit(): void { 
   // localStorage.setItem("currentQuestion",JSON.stringify(0))
    
    if(localStorage.getItem("nid")){
      this.nid=JSON.parse(localStorage.getItem("nid")!)
     }
     if(localStorage.getItem("counter")){
      this.counter=JSON.parse(localStorage.getItem("counter")!)
      
     }
     localStorage.setItem("counter",JSON.stringify(0))
    this.http.get<any>('https://dip-kaluse.github.io/examport/portal.json').subscribe((res: any) => {
       this.tests= res.tests;
      console.log('data response', this.tests);

if(localStorage.getItem("newarr")){

  this.newarr=JSON.parse(localStorage.getItem("newarr")!)
  localStorage.setItem("newarr",JSON.stringify(this.newarr))
}

else{
    
    for(let i=0;i<this.tests.length;i++){
     console.log( this.tests[i]._id)
    
       this.arr=[]
      for(let j=0;j<this.tests[i].questions.length;j++){
        if(this.tests[i].questions[j]?.type=="Multiple-Response"){
            this.arr.push([null,null]);
        }else{
          this.arr.push(null);
        }
     //  localStorage.setItem("arr",JSON.stringify(this.arr))
      }
      
   
  
    console.log(this.arr)
    this.corrans=[];
      for(let k=0;k<this.tests[i].questions.length;k++){
       this.corrans.push(this.tests[i].questions[k]?.correctOptionIndex)
      // console.log(this.corrans);
       }
   
    this.newarr.push({
      id:this.tests[i]._id,
      ans:this.arr,
      correctanswers:this.corrans
    })
    console.log(this.newarr);
    localStorage.setItem("newarr",JSON.stringify(this.newarr))
    
  }
}
      });
    
  }
  testStart(i: any){
   // localStorage.clear();
   console.log(i.questions[0]._id);

    this.router.navigate(['/test',i._id,i.questions[0]._id])

  }

}
