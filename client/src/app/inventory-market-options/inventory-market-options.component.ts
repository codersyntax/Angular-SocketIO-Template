import { Component, Input } from '@angular/core';
import { InventoryItem } from '../model/inventory/inventory-item';
import { CharacterService } from '../character.service';
import { ToastService } from '../toast.service';
import { WebSocketService } from '../web-socket.service';
import { MarketItem } from '../model/market/market-item';

@Component({
  selector: 'app-inventory-market-options',
  templateUrl: './inventory-market-options.component.html',
  styleUrls: ['./inventory-market-options.component.css']
})
export class InventoryMarketOptionsComponent {

  @Input() Item!: InventoryItem;
  private AmountToSell: number = 0;
  public Price: number = 0;

  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) { }

  OnCountSelect(e: any) {
    this.AmountToSell = e.target.value;
  }

  SetPrice(e: any) {
    this.Price = e.target.value;
  }

  Counter(i: number) {
    return new Array(i);
  }

  AddItemToMarket(item: InventoryItem) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.RemoveItems(this.CharacterService.Character.Inventory.Items, item.Item, this.AmountToSell);
    var marketItem = new MarketItem(this.CharacterService.Character, item.Item, this.AmountToSell, this.Price * this.AmountToSell);
    this.WebSocketService.socket.emit("AddMarketItem", JSON.stringify(marketItem));
    this.ToastService.UpdateToast("Added (" + this.AmountToSell + ") " + item.Item.Name + " to the market board");
    this.UpdateStorage();
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
