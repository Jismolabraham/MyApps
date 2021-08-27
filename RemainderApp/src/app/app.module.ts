import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashhboardComponent } from './dashhboard/dashhboard.component';
import { EventsComponent } from './events/events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashhboardComponent,
    EventsComponent,
    DeleteconfirmationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
