import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenceSearchComponent } from './presence-search/presence-search.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import * as fromPresence from './reducers';



@NgModule({
  declarations: [PresenceSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    StoreModule.forFeature(fromPresence.presenceFeatureKey, fromPresence.reducers, { })
  ]
})
export class PresenceModule { }
