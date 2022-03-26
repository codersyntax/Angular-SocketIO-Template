import { Component } from '@angular/core';
import { CharacterService } from '../character.service';
import { InventoryItem } from '../model/inventory/inventory-item';
import { Item, ItemType } from '../model/items/item';
import { ToastService } from '../toast.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent {

  ItemType = ItemType;
  SelectedItem!: InventoryItem;

  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) {}

  ngOnInit() {
    this.SelectedItem = this.CharacterService.Character.Inventory.Items[0];
  }

  AddItemToInventory(item: Item) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.AddItem(this.CharacterService.Character.Inventory.Items, item);
    this.UpdateStorage();
    this.ToastService.UpdateToast("Added " + item.Name + " to inventory");
  }

  RemoveItemFromInventory(item: Item) {
    this.CharacterService.Character.Inventory.Items = this.CharacterService.InventoryHandler.RemoveItem(this.CharacterService.Character.Inventory.Items, item);
    this.UpdateStorage();
    this.ToastService.UpdateToast("Removed " + item.Name + " to inventory");
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
