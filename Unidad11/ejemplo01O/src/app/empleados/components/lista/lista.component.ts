import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmpleadosService } from '../../empleados.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-empleados-lista',
  standalone: false,
  
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public filterSearch:string = '';
  public cargando:boolean = true;
  empleados: any;
  constructor(private _empleadosService: EmpleadosService) { }
  ngOnInit() {
    this._empleadosService.obtengoEmpleadosApi().subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK"){
          this.empleados = resultado.datos;
        }else{
          console.error('Error al recibir datos:', resultado.error);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        setTimeout(()=>{
          this.cargando = false;
        },500) 
      },
    });
  }
  descargarPDF() {
    const doc = new jsPDF(); // Crear instancia de jsPDF
    // Agregar título o texto opcional
    doc.text('Tabla Exportada', 14, 10);
    // Seleccionar la tabla y convertirla a un formato adecuado
    autoTable(doc, {
      html: '#tbempleados', // Selecciona la tabla por su ID
      startY: 20, // Define la posición inicial en Y
    });
    // Guardar el PDF con un nombre
    doc.save('tabla.pdf');
  }
}
