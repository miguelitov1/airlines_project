import { Component } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  newComment = {
    text: '',
    user: '',
    tags: ''
  };

  submitForm() {
    // Aquí puedes enviar el nuevo comentario al backend o realizar la lógica necesaria.
    // Por simplicidad, este ejemplo solo muestra el objeto en la consola.
    console.log(this.newComment);
    this.resetForm();
  }

  resetForm() {
    this.newComment = {
      text: '',
      user: '',
      tags: ''
    };
  }
}