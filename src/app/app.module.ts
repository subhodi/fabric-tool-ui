import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataService } from './services/data.service';

import { FormWizardModule } from 'angular2-wizard';

import { AppComponent } from './app.component';
import { OrdererComponent } from './components/orderer/orderer.component';
import { PeerComponent } from './components/peer/peer.component';
import { HelpComponent } from './components/help/help.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const appRoutes: Routes = [
  { path: '', component: OrdererComponent },
  {
    path: 'peer', component: PeerComponent, children: [
      { path: ':index', component: HelpComponent },
      { path: ':index/edit', component: HelpComponent, outlet: 'peerSection' }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    OrdererComponent,
    PeerComponent,
    HelpComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormWizardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
