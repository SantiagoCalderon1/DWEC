import { Component, ViewChild, viewChild } from '@angular/core';
import { Comment } from "../../comment";
import { NgForm } from '@angular/forms';
import { CommentsService } from '../../comments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: false,

  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @ViewChild('commentForm', { static: true }) commentForm: NgForm | undefined;

  public commentact: Comment = { id: 0, nombre: '', email: '', mensaje: '' };
  public titulo: string = 'Nuevo Comentario';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(
    private _aroute: ActivatedRoute,
    private _commentsService: CommentsService,
    private _route: Router
  ) { }

  ngOnInit() { 
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar comentario (' + this.id + ')';
      this.traeComment(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar comentario (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeComment(this.id);
    }
  }

  private traeComment(id: number) {
    this._commentsService.obtengoCommentApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == 'OK') {
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


  guardaComment(): void {
    if (this.commentForm!.valid) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._commentsService.guardaNuevoCommentApi(this.commentact).subscribe({
          next: (resultado) => {
            console.log('comentario Agregado: ', resultado);
            this._route.navigate(['/comments']);
          },
          error: (error) => {
            console.error('Error al agregar la factura.', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._commentsService.modificaCommentApi(this.id, this.commentact).subscribe({
          next: (resultado) => {
            console.log('Comentario modificado: ', resultado);
            this._route.navigate(['/comments']);
          },
          error: (error) => {
            console.error('Error al modificar el comentario:', error);
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._commentsService.borraCommentApi(this.id).subscribe({
          next: (resultado) => {
            console.log('Comenatrio eliminado: ', resultado);
            this._route.navigate(['/comments']);
          },
          error: (error) => {
            console.error('Error al borrar el comentario:', error);
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

  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
}
