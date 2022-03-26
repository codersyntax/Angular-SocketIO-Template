import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { WebSocketService } from './web-socket.service';
import { CharacterService } from './character.service';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'market', component: MarketComponent },
  { path: 'inventory', component: InventoryComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    WebSocketService,
    CharacterService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
