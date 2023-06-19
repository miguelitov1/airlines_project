import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { HomeComponent } from './home/home.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comments', component: CreateCommentComponent },
  { path: 'comments/:flightId', component: FlightDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
