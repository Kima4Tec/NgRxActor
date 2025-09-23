// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { actorReducer } from './app/state/actor.reducer';
// import { ActorEffects } from './app/state/actor.effects';
// import { ActorPageComponent } from './app/components/actor-page/actor-page.component';

// bootstrapApplication(ActorPageComponent, {
//   providers: [
//     provideHttpClient(),
//     provideStore({ actors: actorReducer }),
//     provideEffects([ActorEffects])
//   ]
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { actorReducer } from './app/state/actor.reducer';
import { ActorPageComponent } from './app/components/actor-page/actor-page.component';

bootstrapApplication(ActorPageComponent, {
  providers: [
    provideStore({ actors: actorReducer })
  ]
}).catch(err => console.error(err));
