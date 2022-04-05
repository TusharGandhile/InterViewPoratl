import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishComponent } from './finish/finish.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'test/:id/:qid',component:TestComponent},
  {path:'finish/:id',component:FinishComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
