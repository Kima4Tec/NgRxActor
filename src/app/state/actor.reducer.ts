// import { createReducer, on } from '@ngrx/store'
// import { createEntityAdapter, EntityState } from '@ngrx/entity';
// import * as ActorActions from './actor.actions';
// import { Actor } from '../models/actor.model';

// export interface ActorState extends EntityState<Actor> {
//   selectedActorId: number | null;
//   loading: boolean;
//   error: any;
// }

// export const actorAdapter = createEntityAdapter<Actor>();

// export const initialState: ActorState = actorAdapter.getInitialState({
//   selectedActorId: null,
//   loading: false,
//   error: null
// });

// export const actorReducer = createReducer(
//   initialState,
//   on(ActorActions.loadActors, state => ({ ...state, loading: true })),
//   on(ActorActions.loadActorsSuccess, (state, { actors }) =>
//     actorAdapter.setAll(actors, { ...state, loading: false })
//   ),
//   on(ActorActions.loadActorsFailure, (state, { error }) => ({ ...state, loading: false, error })),
//   on(ActorActions.selectActor, (state, { actorId }) => ({ ...state, selectedActorId: actorId }))
// );

import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as ActorActions from './actor.actions';
import { Actor } from '../models/actor.model';

export interface ActorState extends EntityState<Actor> {
  selectedActorId: number | null;
  loading: boolean;
  error: any;
}

export const actorAdapter = createEntityAdapter<Actor>();

export const initialState: ActorState = actorAdapter.getInitialState({
  selectedActorId: null,
  loading: false,
  error: null
});

export const actorReducer = createReducer(
  initialState,
  on(ActorActions.loadActors, state => ({ ...state, loading: true })),
  on(ActorActions.loadActorsSuccess, (state, { actors }) =>
    actorAdapter.setAll(actors, { ...state, loading: false })
  ),
  on(ActorActions.loadActorsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(ActorActions.selectActor, (state, { actorId }) => ({ ...state, selectedActorId: actorId }))
);

