import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngb-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
