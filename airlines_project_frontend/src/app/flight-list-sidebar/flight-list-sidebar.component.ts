import { Component, OnInit } from '@angular/core';
import { BackendService } from '../airline-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-list-sidebar',
  templateUrl: './flight-list-sidebar.component.html',
  styleUrls: ['./flight-list-sidebar.component.css']
})

export class FlightListSidebarComponent implements OnInit {
  flights: any[];
  selectedFlight: any;
  showComments = false;

  constructor(private backendService: BackendService, private router: Router) { 
    this.flights = [];
  }

  ngOnInit() {
    this.backendService.getFlights().subscribe((flights: Object) => {
      this.flights = flights as any[];
    });
  }

  selectFlight(flight: any) {
    this.selectedFlight = flight;
    this.showComments = true; //hide component

  }
  
  onGoBack() {
    this.showComments = false;
  //  this.router.navigate(['/']);
  }
  // Redirect to the CommentTableComponent component and pass the flight ID as a parameter in the URL
  // this.router.navigate(['/comments', flight.id]);
}