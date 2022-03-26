import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { InventoryItem } from '../model/inventory/inventory-item';
import { Item, ItemType } from '../model/items/item';
import { MarketItem } from '../model/market/market-item';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-inventory',
  providers: [ 
    WebSocketService,
    CharacterService
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  ItemType = ItemType;

  constructor(private router: Router, public CharacterService: CharacterService, private WebSocketService: WebSocketService) {
    var save = localStorage.getItem('character');
    if(save)
    {
      var character = JSON.parse(save);
      this.WebSocketService.socket.emit("userSubmittedPlayerName", character);
      this.CharacterService.SetExistingCharacter(character);
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  AddItemToMarket(item: InventoryItem) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.RemoveItem(this.CharacterService.Character.Inventory.Items, item.Item);
    var marketItem = new MarketItem(this.CharacterService.Character, item.Item, 1, 1);
    this.WebSocketService.socket.emit("AddMarketItem", JSON.stringify(marketItem));
    this.UpdateStorage();
  }

  AddAllItemToMarket(item: InventoryItem) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.RemoveItems(this.CharacterService.Character.Inventory.Items, item.Item, item.Count);
    var marketItem = new MarketItem(this.CharacterService.Character, item.Item, item.Count, 1);
    this.WebSocketService.socket.emit("AddMarketItem", JSON.stringify(marketItem));
    this.UpdateStorage();
  }

  AddItemToInventory(item: Item) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.AddItem(this.CharacterService.Character.Inventory.Items, item);
    this.UpdateStorage();
  }

  RemoveItemFromInventory(item: Item) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.RemoveItem(this.CharacterService.Character.Inventory.Items, item);
    this.UpdateStorage();
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
