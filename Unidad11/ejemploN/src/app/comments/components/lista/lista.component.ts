import { Component } from '@angular/core';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-lista',
  standalone: false,
  
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  comentarios: any;
    constructor(private _commentsService: CommentsService) { }
    ngOnInit() {
      this._commentsService.obtengoComentariosApi().subscribe({
        next: (resultado) => {
          if (resultado.mensaje == "OK"){
            this.comentarios = resultado.datos;
          }else{
            console.error('Error al recibir datos:', resultado.error);
          }
        },
        error: (error) => {
          console.error('Error al recibir datos:', error);
        },
        complete: () => {
          console.log('Operación completada.');
        },
      });
    }
  }