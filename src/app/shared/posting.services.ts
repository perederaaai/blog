import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from './interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({providedIn: 'root'})

export class PostingServices {

  constructor(private http: HttpClient) {
  }

  create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${environment.dbUrl}post.json`, post)
      .pipe(
        map((response: IPost) => {
          return {
            ...post,
            id: response.name
          }
        })
      );
  };

  getAllPost(): Observable<any> {
    return this.http.get(`${environment.dbUrl}post.json`)
      .pipe(
        map(
          (response: { [key: string]: any }) => {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
              }))
          })
      );
  };

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.dbUrl}post/${id}.json`)
      .pipe(map((post: IPost) => {
          return {
            ...post, id,
            date: new Date(post.date)
          }
        }
      ))

  };

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.dbUrl}post/${post.id}.json`, post)
  }


  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.dbUrl}post/${id}.json`)
  }

}
