// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Actor } from '../models/actor.model';

// @Injectable({ providedIn: 'root' })
// export class ActorService {
//   private baseUrl = 'https://localhost:7031/api/actor';

//   constructor(private http: HttpClient) {}

//   getActors(): Observable<Actor[]> {
//     return this.http.get<Actor[]>(this.baseUrl);
//   }

//   getActorById(id: number): Observable<Actor> {
//     return this.http.get<Actor>(`${this.baseUrl}/${id}`);
//   }
// }


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Actor } from '../models/actor.model';

@Injectable({ providedIn: 'root' })
export class ActorService {
  private mockActors: Actor[] = [
    { id: 1, firstName: 'Tom', lastName: 'Hanks', birthDate: '1956-07-09' },
    { id: 2, firstName: 'Meryl', lastName: 'Streep', birthDate: '1949-06-22' },
    { id: 3, firstName: 'Leonardo', lastName: 'DiCaprio', birthDate: '1974-11-11' }
  ];

  getActors(): Observable<Actor[]> {
    // Simulerer forsinkelse som i et API-kald
    return of(this.mockActors).pipe(delay(500));
  }
}
