import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BackendService } from "../airline-backend.service";
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.css']
})
export class CommentTableComponent {
  @Input() id: number | undefined;
  comments: Comment[] = [];

  constructor(private backendService: BackendService) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue) {
      this.getComments();
    }
  }

  getComments() {
    if (this.id) {

      this.backendService.getCommentsByFlightId(this.id)
        .subscribe((response: any) => {
        this.comments = response as Comment[];
          //console.log(response);
        });

    } else {

      this.comments = [];

    }
  }
}
