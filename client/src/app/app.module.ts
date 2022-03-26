import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { InventoryMarketOptionsComponent } from './inventory-market-options/inventory-market-options.component';
import { MiningComponent } from './mining/mining.component';
import { BotanyComponent } from './botany/botany.component';
import { WeaponsmithingComponent } from './weaponsmithing/weaponsmithing.component';

const hostname = window.location.hostname;
const url = (hostname === 'localhost') ? `${window.location.protocol}//${hostname}:5000` : "";
const config: SocketIoConfig = { url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketComponent,
    InventoryComponent,
    InventoryMarketOptionsComponent,
    MiningComponent,
    BotanyComponent,
    WeaponsmithingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
