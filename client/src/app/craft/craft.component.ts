import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { CharacterService } from '../character.service';
import { WebSocketService } from '../web-socket.service';
import { ItemType } from '../model/items/item';
import { Craftable } from '../model/items/craftable-items/craftable';

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrls: ['./craft.component.css']
})
export class CraftComponent implements OnInit {

  ItemType = ItemType;
  
  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) { }

  ngOnInit(): void {
  }

  CraftItem(item: Craftable) {
    if (this.CharacterService.IsBusy) {
      this.CharacterService.IsBusy = false;
      if (this.CharacterService.GlobalInterval != undefined) {
        clearInterval(this.CharacterService.GlobalInterval);
        this.CharacterService.GlobalInterval = undefined;
      }
    }
    else {
      if (this.CharacterService.CraftHandler.HasRequiredMaterials(this.CharacterService.Character.Inventory, item.Recipe)) {
        if (item.LevelRequirement <= this.CharacterService.Character.Level) {
          this.CharacterService.IsBusy = true;
          this.CharacterService.GlobalInterval = setInterval(() => {
            this.CharacterService.CraftHandler.CraftItem(item, this.CharacterService.Character, this.CharacterService.Character.Inventory);
            this.UpdateStorage();
            this.ToastService.UpdateToast("Received " + item.Experience + "xp for crafting " + item.Name);
          }, item.CraftTime * 1000)
        }
        else {
          this.ToastService.UpdateToast("You are not the required level to craft " + item.Name);
        }
      }
      else {
        this.CharacterService.IsBusy = false;
        this.ToastService.UpdateToast("You do not possess the required materials to craft " + item.Name);
      }

    }
  }

  CancelAction() {
    clearInterval(this.CharacterService.GlobalInterval);
    this.CharacterService.GlobalInterval = undefined;
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
