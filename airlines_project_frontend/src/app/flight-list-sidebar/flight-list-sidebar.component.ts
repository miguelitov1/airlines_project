import { Component, OnInit } from '@angular/core';
import { BackendService } from '../airline-backend.service';
import { Router } from '@angular/router';
import { Flight } from '../models/flight.module';


@Component({
  selector: 'app-flight-list-sidebar',
  templateUrl: './flight-list-sidebar.component.html',
  styleUrls: ['./flight-list-sidebar.component.css']
})

export class FlightListSidebarComponent implements OnInit {
  flights: Flight[];
  selectedFlight: any;

  constructor(private backendService: BackendService, private router: Router) { 
    this.flights = [];
  }

  ngOnInit() {
    this.backendService.getFlights().subscribe((flights: any) => {
      this.flights = flights as Flight[];
    });
  }

  selectFlight(flight: any) {
    this.selectedFlight = flight;
    this.router.navigate([`/comments/${flight.id}`], {queryParams: {airlineName: flight.airlineName, flightNumber: flight.flightId }});

  }
  
}