// import { createAction, props } from '@ngrx/store';
// import { Actor } from '../models/actor.model';

// export const loadActors = createAction('[Actor] Load Actors');
// export const loadActorsSuccess = createAction(
//   '[Actor] Load Actors Success',
//   props<{ actors: Actor[] }>()
// );
// export const loadActorsFailure = createAction(
//   '[Actor] Load Actors Failure',
//   props<{ error: any }>()
// );

// export const selectActor = createAction(
//   '[Actor] Select Actor',
//   props<{ actorId: number }>()
// );

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

