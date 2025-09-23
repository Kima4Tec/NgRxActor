// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { ActorService } from '../services/actor.service';
// import * as ActorActions from './actor.actions';
// import { catchError, map, mergeMap, of } from 'rxjs';

// @Injectable()
// export class ActorEffects {
//   loadActors$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ActorActions.loadActors),
//       mergeMap(() =>
//         this.actorService.getActors().pipe(
//           map(actors => ActorActions.loadActorsSuccess({ actors })),
//           catchError(error => of(ActorActions.loadActorsFailure({ error })))
//         )
//       )
//     )
//   );

//   constructor(private actions$: Actions, private actorService: ActorService) {}
// }

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActorService } from '../services/actor.service';
import * as ActorActions from './actor.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ActorEffects {
  loadActors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActorActions.loadActors),
      mergeMap(() =>
        this.actorService.getActors().pipe(
          map(actors => ActorActions.loadActorsSuccess({ actors })),
          catchError(error => of(ActorActions.loadActorsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private actorService: ActorService) {}
}
