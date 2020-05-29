import { DirectorySearchComponent } from './directory-search/directory-search.component';
import { Page404Component } from './page404/page404.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PresenceSearchComponent } from './presence/presence-search/presence-search.component';
import { ConfigComponent } from './config/config/config.component';
import { ConfigResolver } from './config/ConfigResolver';

const routes: Routes = [
  { path: '',   redirectTo: '/directory', pathMatch: 'full' },   // default
  { path: 'directory', component: DirectorySearchComponent },
  { path: 'presence', component: PresenceSearchComponent },
  { path: 'config', component: ConfigComponent, resolve: {config: ConfigResolver} },
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })    // <-- debugging purposes only
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
