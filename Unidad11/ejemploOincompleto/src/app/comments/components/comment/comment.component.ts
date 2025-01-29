import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from '../../Comment';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-comment',
  standalone: false,

  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @ViewChild('commentForm', { static: true }) commentForm: NgForm | undefined;
  public commentact: Comment = { id: 0, nombre: '', email: '', mensaje: '' }
  public titulo: string = 'Nuevo Comentario';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _commentsService: CommentsService, private _route: Router) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Comentario (' + this.id + ')';
      this.traeComentario(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Comentario (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeComentario(this.id);
    }
  }
  private traeComentario(id: number) {
    this._commentsService.obtengoComentarioApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK") {
          this.commentact = resultado.datos;
        } else {
          console.error('Error al obtener el comentario:', resultado.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al obtener el comentario:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaComentario(): void {
    if (this.commentForm!.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._commentsService.guardaNuevoComentarioApi(this.commentact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              console.log('Comentario agregado:', resultado.datos);
              this._route.navigate(['/comentarios']);
            } else {
              console.error('Error al agregar el comentario:', resultado.errores);
            }
          },
          error: (error) => {
            console.error('Error al agregar el comentario:', error.error.errores);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._commentsService.modificaComentarioApi(this.id, this.commentact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              console.log('Comentario modificado:', resultado.datos);
              this._route.navigate(['/comentarios']);
            } else {
              console.error('Error al modificar el comentario:', resultado.errores);
            }
          },
          error: (error) => {
            console.error('Error al modificar el comentario:', error.error.errores);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._commentsService.borraComentarioApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              console.log('Valor eliminado:', resultado.datos);
              this._route.navigate(['/comentarios']);
            } else {
              console.error('Error al eliminar el comentario:', resultado.errores);
            }
          },
          error: (error) => {
            console.error('Error al borrar el comentario:', error.error.errores);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else alert("El formulario tiene campos inválidos");
  }
  cambiado(): void {
    this.formularioCambiado = true;
  }
  // Método que será llamado por el guard
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }

}