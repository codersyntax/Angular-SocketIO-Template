import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { WebSocketService } from './web-socket.service';
import { CharacterService } from './character.service';
import { InventoryComponent } from './inventory/inventory.component';
import { MiningComponent } from './mining/mining.component';
import { BotanyComponent } from './botany/botany.component';
import { WeaponsmithingComponent } from './weaponsmithing/weaponsmithing.component';
import { SmithingComponent } from './smithing/smithing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'market', component: MarketComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'mining', component: MiningComponent },
  { path: 'botany', component: BotanyComponent },
  { path: 'smithing', component: SmithingComponent },
  { path: 'weaponsmithing', component: WeaponsmithingComponent },
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
