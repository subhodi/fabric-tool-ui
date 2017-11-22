import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './services/data.service';
import { PeerService } from './services/peer.service';
import { OrdererService } from './services/orderer.service';

import { FormWizardModule } from 'angular2-wizard';

import { AppComponent } from './app.component';
import { OrdererComponent } from './components/orderer/orderer.component';
import { PeerComponent } from './components/peer/peer.component';
import { HelpComponent } from './components/help/help.component';
import { TaskStatusComponent } from './components/helper/task-status/task-status.component';
import { OrdererWizardComponent } from './components/orderer-wizard/orderer-wizard.component';

const appRoutes: Routes = [
  { path: '', component: PeerComponent },
  {
    path: 'orderer', component: OrdererComponent, children: [
      { path: 'data', component: HelpComponent, outlet: 'peerSection' },
      { path: 'submit', component: HelpComponent, outlet: 'peerSection' },
      { path: 'result', component: HelpComponent, outlet: 'peerSection' },
      { path: 'input', component: HelpComponent, outlet: 'peerSection' }
    ]
  },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OrdererComponent,
    PeerComponent,
    HelpComponent,
    TaskStatusComponent,
    OrdererWizardComponent,
  ],
  imports: [
    BrowserModule,
    FormWizardModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, PeerService, OrdererService],
  bootstrap: [AppComponent]
})
export class AppModule { }
