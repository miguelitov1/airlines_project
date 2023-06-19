import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BackendService } from "../airline-backend.service";

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.css']
})
export class CommentTableComponent {
  @Input() id: number | undefined;
  comments: any[] = [];

  constructor( private backendService: BackendService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue) {
      this.getComments();
    }
  }

  getComments() {
    if (this.id) {

      this.backendService.getCommentsByFlightId(this.id)
        .subscribe((response: any) => {
          //console.log(response);
          this.comments = response;
        });

    } else {

      this.comments = [];

    }
  }
}
