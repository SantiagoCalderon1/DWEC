import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';

@NgModule({
  declarations: [
    CommentComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CommentsModule { }
