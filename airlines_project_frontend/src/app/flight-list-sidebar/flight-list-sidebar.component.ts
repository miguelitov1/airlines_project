import { Component, OnInit } from '@angular/core';
import { BackendService } from '../airline-backend.service';

@Component({
  selector: 'app-flight-list-sidebar',
  templateUrl: './flight-list-sidebar.component.html',
  styleUrls: ['./flight-list-sidebar.component.css']
})

export class FlightListSidebarComponent implements OnInit {
  flights: any[];

  constructor(private backendService: BackendService) { 
    this.flights = [];
  }

  ngOnInit() {
    this.backendService.getFlights().subscribe((flights: Object) => {
      this.flights = flights as any[];
    });
  }

  selectFlight(flight: any) {
    // Aquí puedes agregar la lógica que deseas ejecutar al seleccionar un vuelo
    console.log('Vuelo seleccionado:', flight);
  }
}