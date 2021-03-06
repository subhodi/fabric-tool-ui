import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PeerService } from './services/peer.service';
import { OrdererService } from './services/orderer.service';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { OrdererComponent } from './components/orderer/orderer.component';
import { PeerComponent } from './components/peer/peer.component';
import { HelpComponent } from './components/help/help.component';
import { TaskStatusComponent } from './components/helper/task-status/task-status.component';
import { CryptogenFormComponent } from './components/orderer-wizard/cryptogen-form/cryptogen-form.component';
import { OrdererServiceFormComponent } from './components/orderer-wizard/orderer-service-form/orderer-service-form.component';
import { OrdererOutputComponent } from './components/orderer-wizard/orderer-output/orderer-output.component';
import { AddPeerorgFormComponent } from './components/orderer-wizard/add-peerorg-form/add-peerorg-form.component';

const appRoutes: Routes = [
  { path: '', component: PeerComponent },
  {
    path: 'orderer', component: OrdererComponent, children: [
      { path: '', redirectTo: '/orderer/(ordererSection:cryptogen)', pathMatch: 'full' },
      { path: 'cryptogen', component: CryptogenFormComponent, outlet: 'ordererSection' },
      { path: 'orderer-service', component: OrdererServiceFormComponent, outlet: 'ordererSection' },
      { path: 'add-peerorg', component: AddPeerorgFormComponent, outlet: 'ordererSection' },
      { path: 'orderer-output', component: OrdererOutputComponent, outlet: 'ordererSection' }
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
    CryptogenFormComponent,
    OrdererServiceFormComponent,
    OrdererOutputComponent,
    AddPeerorgFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PeerService, OrdererService],
  bootstrap: [AppComponent]
})
export class AppModule { }
