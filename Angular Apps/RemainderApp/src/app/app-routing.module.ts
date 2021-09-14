import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashhboardComponent } from './dashhboard/dashhboard.component';
import { DeleteeventComponent } from './deleteevent/deleteevent.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashhboardComponent},
  {path:'events',component:EventsComponent},
  {path:'delete',component:DeleteeventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
