import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OrdererComponent } from './components/orderer/orderer.component';
import { PeerComponent } from './components/peer/peer.component';

const appRoutes: Routes = [
  { path: '', component : OrdererComponent },
  { path: 'peer', component : PeerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OrdererComponent,
    PeerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
