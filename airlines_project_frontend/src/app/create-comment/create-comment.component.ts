import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../airline-backend.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})

export class CreateCommentComponent {
  tagsArray: any = [];;
  response: any | undefined;
  id: number | undefined;
  flightId: number | undefined;
  newComment = {
    userComment: '',
    flight_id: 0,
  };
  tags = '';

  constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService) {}


  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.flightId = Number(queryParams.get('flightId'));
    });
  }

  submitForm() {
    this.newComment.flight_id = this.flightId || 0;
    this.backendService.createComment(this.newComment)
      .subscribe({
        next: (response) => {
          this.response = response;
          console.log('Comentario enviado correctamente');
          if (this.tagsArray.length > 0 && this.response) {
            this.addTagsToComment();
          }
          this.resetForm();
          this.backToHome();
        },
        error: (error) => {
          console.error('Error al enviar el comentario', error);
        }
      });
  }

  addTagsToComment() {
      if (this.tagsArray.length > 0  && this.response) {
        this.backendService.addTagsToComment(this.response.id, this.tagsArray[0])
        .subscribe({
          next: (response) => {
            console.log('Tags agregados correctamente al comentario');
          },
          error: (error) => {
            console.error('Error al agregar los tags al comentario', error);
          }
        });
      }
      this.backToHome();
    }

  
    onTagsInputChange() {
      if (this.tags.trim() !== '') {
        this.tagsArray = [{ tags: this.tags.split(',').map((tag) => tag.trim()) }];
      } else {
        this.tagsArray = [];
      }
    }

  resetForm() {
    this.newComment = {
      userComment: '',
      flight_id: 0,
    };

    this.tagsArray = [];
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}