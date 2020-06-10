import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenceSearchComponent } from './presence-search/presence-search.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import * as fromPresence from './presence.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PresenceEffects } from './presence.effects';
import { PresenceInStoreComponent } from './presence-in-store/presence-in-store.component';

@NgModule({
  declarations: [PresenceSearchComponent, PresenceInStoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    StoreModule.forFeature(fromPresence.presenceFeatureKey, fromPresence.reducer),
    EffectsModule.forFeature([PresenceEffects]),
  ]
})
export class PresenceModule { }
