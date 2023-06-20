import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})


export class FlightDetailsComponent {
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
  airlineName: string | undefined;
  flightId: string | undefined;
  id: number | undefined;

constructor(private router: Router, private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe((params) => {
    const flightId = params.get('flightId');
    this.id = flightId ? +flightId : undefined;
    this.flightId = this.route.snapshot.queryParamMap.get('flightNumber') || undefined;
    this.airlineName = this.route.snapshot.queryParamMap.get('airlineName') || undefined;
  });
}

onGoBack() {
  this.router.navigate(['/']);
}

onAddComment() {
  this.router.navigate(['/comments'], {queryParams: {flightId: this.id}});
}
  
}
