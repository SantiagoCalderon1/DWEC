import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  urlApi = 'http://test-api25s.jtarrega.es/api/comments';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  obtengoComentariosApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }
  guardaNuevoComentarioApi(comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, JSON.stringify(comment), this.httpOptions);
  }
  obtengoComentarioApi(ncomment: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${ncomment}`);
  }
  modificaComentarioApi(ncomment: number, comment: Comment): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${ncomment}`, JSON.stringify(comment), this.httpOptions);
  }
  borraComentarioApi(ncomment: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${ncomment}`);
  }
}
