// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { Actor } from '../../models/actor.model';
// import * as ActorActions from '../../state/actor.actions';
// import * as ActorSelectors from '../../state/actor.selectors';

// @Component({
//   selector: 'app-actor-page',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './actor-page.component.html'
// })
// export class ActorPageComponent implements OnInit {
//   private store = inject(Store);

//   actors$!: Observable<Actor[]>;
//   loading$!: Observable<boolean>;
//   selectedActor$!: Observable<Actor | null>;
//   selectedActorId: number | null = null; // til binding i select

//   ngOnInit(): void {
//     this.actors$ = this.store.select(ActorSelectors.selectAllActors);
//     this.loading$ = this.store.select(ActorSelectors.selectLoading);
//     this.selectedActor$ = this.store.select(ActorSelectors.selectSelectedActor);

//     this.store.dispatch(ActorActions.loadActors());
//   }

// onSelect(event: Event) {
//   const selectElement = event.target as HTMLSelectElement;
//   const id = Number(selectElement.value);
//   this.selectedActorId = id;
//   this.store.dispatch(ActorActions.selectActor({ actorId: id }));
// }


// }


import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../models/actor.model';
import * as ActorActions from '../../state/actor.actions';
import * as ActorSelectors from '../../state/actor.selectors';

@Component({
  selector: 'app-actor-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-page.component.html'
})
export class ActorPageComponent implements OnInit {
  private store = inject(Store);
  private actorService = inject(ActorService);

  actors$!: Observable<Actor[]>;
  loading$!: Observable<boolean>;
  selectedActor$!: Observable<Actor | null>;
  selectedActorId: number | null = null;

  ngOnInit(): void {
    this.store.dispatch(ActorActions.loadActors()); // loading = true

    // Hent mockdata direkte
    this.actorService.getActors().subscribe(actors => {
      this.store.dispatch(ActorActions.loadActorsSuccess({ actors }));
    });

    this.actors$ = this.store.select(ActorSelectors.selectAllActors);
    this.loading$ = this.store.select(ActorSelectors.selectLoading);
    this.selectedActor$ = this.store.select(ActorSelectors.selectSelectedActor);
  }

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value);
    this.selectedActorId = id;
    this.store.dispatch(ActorActions.selectActor({ actorId: id }));
  }
}
