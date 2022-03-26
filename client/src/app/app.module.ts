import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';
import { WebSocketService } from './web-socket.service';
import { CharacterService } from './character.service';
import { InventoryComponent } from './inventory/inventory.component';
import { ToastService } from './toast.service';
import { FormsModule } from '@angular/forms';
import { InventoryMarketOptionsComponent } from './inventory-market-options/inventory-market-options.component';
import { GatherComponent } from './gather/gather.component';
import { CraftComponent } from './craft/craft.component';

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
    GatherComponent,
    CraftComponent
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
