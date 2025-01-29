import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from '../../Comment';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../comments.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private _aroute: ActivatedRoute, private _commentsService: CommentsService, private _route: Router, private toastr: ToastrService) { }
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
          this.toastr.error(resultado.mensaje, 'Error al obtener el comentario');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el comentario');
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
              this.toastr.success('Se ha agregado '+resultado.datos.nombre, 'Comentario agregado correctamente!');
              this._route.navigate(['/comentarios']);
            } else {
              this.toastr.error(resultado.errores, 'Error guardando comentario');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error guardando comentario');
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
              this.toastr.success('Se ha modificado '+resultado.datos.nombre, 'Comentario modificado correctamente!');
              this._route.navigate(['/comentarios']);
            } else {
              this.toastr.error(resultado.errores, 'Error modificando comentario');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error modificando comentario');
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
              this.toastr.success('Se ha eliminado '+resultado.datos.nombre, 'Comentario eliminado correctamente!');
              this._route.navigate(['/comentarios']);
            } else {
              this.toastr.error(resultado.errores, 'Error eliminando comentario');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error eliminando comentario');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else this.toastr.error("El formulario tiene campos inválidos", 'Error de validación');
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