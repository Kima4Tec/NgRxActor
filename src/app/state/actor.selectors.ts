// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { actorAdapter, ActorState } from './actor.reducer';

// export const selectActorState = createFeatureSelector<ActorState>('actors');

// const { selectAll } = actorAdapter.getSelectors(selectActorState);

// export const selectAllActors = selectAll;

// export const selectLoading = createSelector(
//   selectActorState,
//   state => state.loading
// );

// export const selectSelectedActor = createSelector(
//   selectActorState,
//   state => state.entities[state.selectedActorId ?? -1] ?? null
// );

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { actorAdapter, ActorState } from './actor.reducer';

export const selectActorState = createFeatureSelector<ActorState>('actors');

const { selectAll } = actorAdapter.getSelectors(selectActorState);

export const selectAllActors = selectAll;

export const selectLoading = createSelector(
  selectActorState,
  state => state.loading
);

export const selectSelectedActor = createSelector(
  selectActorState,
  state => state.entities[state.selectedActorId ?? -1] ?? null
);
