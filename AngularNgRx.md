# **Actor.service.ts**


```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';

@Injectable({ providedIn: 'root' })
export class ActorService {
  private baseUrl = 'https://localhost:7031/api/actor';

  constructor(private http: HttpClient) {}

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.baseUrl);
  }

  getActorById(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${this.baseUrl}/${id}`);
  }
}
```

### **@Injectable**
- Det er en Angular decorator.
- Den markerer en klasse som noget, Angular kan injektere (Dependency Injection).
- Uden den kan Angular ikke lave en instans af servicen og uddele den til komponenter/andre services.
- **providedIn: 'root'** betyder, at Angular automatisk opretter én instans (singleton), som hele app’en kan bruge uden at du manuelt skal tilføje den i en providers-liste.

I C# ville det være: **services.AddSingleton&lt;ActorService&gt;();** og altså en dependency injection

**{ providedIn: 'root' }**
- providedIn: 'root' → svarer til singleton-livstid i C#.
- Der laves én instans af ActorService for hele Angular-app’en.

Sammenlignet med C#:

**Angular**
```angular
@Injectable({ providedIn: 'root' })
export class ActorService {
  // shared singleton
}
```

**C#**
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<ActorService>();
}

``` 

**constructor(private http: HttpClient) {}**
Injektion af HttpClient i konstruktøren


**Forklarring**
```
getActors(): Observable<Actor[]> {
  return this.http.get<Actor[]>(this.baseUrl);
}

```
**getActors** → navnet på metoden, som henter alle skuespillere.

**(): Observable<Actor[]>** → metoden returnerer en Observable, som indeholder et array af Actor objekter.
- Observable er fra RxJS og bruges i Angular til at håndtere asynkrone data (f.eks. HTTP-requests). Man kan tænke Observable som en datastrøm, hvor værdier dukker op over tid, eller som en radio-kanal, hvor man tuner ind med subscribe.
**Actor[]** betyder, at det er et array af Actor-objekter.

**return this.http.get<Actor[]>(this.baseUrl);**
**this.http**
HttpClient i constructor

**.get<Actor[]>**
Der bliver lavet er GET request.

<Actor[]> → TypeScript generics bruges her til at fortælle:

“Jeg forventer, at svaret fra API’et er et array af Actor objekter.”

Get henter fra denne adresse: **this.baseUrl**

this → den instans af klassen, du arbejder med. I dette tilfælde er det ActorService - i praksis sådan her: 

**const actorService = new ActorService(new HttpClient(...));**

this.http → ActorService.http
this.BaseUrl → ActorService.BaseUrl

Du får en Observable tilbage og skal hente data med en subscribe.

# NgRx

## Flowet
**Action:** beskriver hvad der skal ske
**Component:** dispatch(loadActors()) → “Hent actors”
**Effect:** fanger loadActors → kalder API → success/failure action
**Reducer:** opdaterer state baseret på action type og payload
**Selectors:** komponent læser actors/loading/error fra state
**Template:** viser data med async pipe

---

## Flow i kode:

**actions:** export const loadActors = createAction('[Actor] Load Actors');
**dispatch i component:** this.store.dispatch(loadActors());
- Komponent fortæller NgRx: “Start hent af actors”.
- Nu bliver actionen sendt ind i store og kan opfanges af effects eller reducers.

**effects:** this.actions$.pipe(ofType(loadActors),...)
- this.actions$
    - Dette er en Observable, som sender alle actions, der bliver dispatched i app’en.
    - Forestil dig det som en “stream” af alt, hvad der sker i NgRx-store: alle dispatch()-kald.
- ofType(loadActors)
    - En filter-operator fra NgRx Effects.
    - Den lytter kun efter actions med typen loadActors.
    - Andre actions ignoreres i dette effect.

I Angular/NgRx/TypeScript er det en almindelig konvention at tilføje $ til variabelnavne, der repræsenterer en Observable.
pipe bruges til at kæde RxJS-operators



---

## **Actor.actions.ts**

### Koden:
```
import { createAction, props } from '@ngrx/store';
import { Actor } from '../models/actor.model';

export const loadActors = createAction('[Actor] Load Actors');
export const loadActorsSuccess = createAction(
  '[Actor] Load Actors Success',
  props<{ actors: Actor[] }>()
);
export const loadActorsFailure = createAction(
  '[Actor] Load Actors Failure',
  props<{ error: any }>()
);

export const selectActor = createAction(
  '[Actor] Select Actor',
  props<{ actorId: number }>()
);
```
---


```
import { createAction, props } from '@ngrx/store';
import { Actor } from '../models/actor.model';
```
createAction → bruges til at oprette en action i NgRx.
props → bruges, når en action skal have ekstra data (payload).
- I NgRx bruges props kun til at sende data med en action – aldrig til at "hente" data.
- **uden props:** { type: '[Actor] Load Actors' }
- **med props:** { type: '[Actor] Load Actors Success', actors: [...] }
    - props gør det muligt at give en "pakke data" (payload) med på actionen, så reduceren eller effekten kan bruge det.

Actor → dit interface, så du kan type-sikre data.

---


### 🔑 Actions i NgRx

En action er et simpelt objekt, der beskriver hvad der sker i din app.
Den har altid en type (fx "[Actor] Load Actors").
Den kan have data (payload), fx listen af Actor.

---