import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { CommentsComponent } from './components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ListaComponent,
    CommentsComponent
  ],
  providers: [provideHttpClient()],

})
export class CommentsModule { }
