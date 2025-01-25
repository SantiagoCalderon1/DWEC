import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './comment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  urlApi = 'http://test-api25s.jtarrega.es/api/comments';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en las cabeceras
    }),
  };

  constructor(private http: HttpClient) { }

  obtengoCommentsApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  guardaNuevoCommentApi(comment: Comment): Observable<any> {
    return this.http.post<any>(
      `${this.urlApi}`,
      JSON.stringify(comment),
      this.httpOptions
    );
  }

  obtengoCommentApi(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  modificaCommentApi(id: number, comment: Comment): Observable<any> {
    return this.http.put<any>(
      `${this.urlApi}/${id}`,
      JSON.stringify(comment),
      this.httpOptions
    );
  }

  borraCommentApi(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
