import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})


export class FlightDetailsComponent {
  @Input() airlineName: string | undefined;
  @Input() flightId: string | undefined;
  @Input() id: number | undefined;
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

constructor(private router: Router) {}

onClickGoBack() {
  this.goBack.emit();
}

onAddComment() {
  console.log('Add Comment button clicked');
}
  
}
