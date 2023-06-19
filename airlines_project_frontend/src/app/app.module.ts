import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightListSidebarComponent } from './flight-list-sidebar/flight-list-sidebar.component';
import { CommentTableComponent } from './comment-table/comment-table.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { HomeComponent } from './home/home.component';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightListSidebarComponent,
    CommentTableComponent,
    CreateCommentComponent,
    FlightDetailsComponent,
    HomeComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
