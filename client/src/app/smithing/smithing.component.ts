import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { CharacterService } from '../character.service';
import { WebSocketService } from '../web-socket.service';
import { Item, ItemType } from '../model/items/item';
import { Craftable, UseType } from '../model/items/craftable-items/craftable';

@Component({
  selector: 'app-smithing',
  templateUrl: './smithing.component.html',
  styleUrls: ['./smithing.component.css']
})
export class SmithingComponent implements OnInit {

  ItemType = ItemType;
  ExperienceType = UseType;
  
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
        if (item.LevelRequirement <= this.CharacterService.Character.Skills.SmithingLevel) {
          this.CharacterService.IsBusy = true;
          this.CharacterService.Rate = item.CraftTime * 1000;
          this.CharacterService.GlobalInterval = setInterval(() => {
            this.CharacterService.CraftHandler.CraftItem(item, this.CharacterService.Character, this.CharacterService.Character.Inventory);
            this.UpdateStorage();
            this.ToastService.UpdateToast("Received " + item.Experience + " smithing xp for smithing " + item.Name);
          }, item.CraftTime * 1000)
        }
        else {
          this.ToastService.UpdateToast("You are not the required level to smith " + item.Name);
        }
      }
      else {
        this.CharacterService.IsBusy = false;
        this.ToastService.UpdateToast("You do not possess the required materials to smith " + item.Name);
      }

    }
  }

  CancelAction() {
    clearInterval(this.CharacterService.GlobalInterval);
    this.CharacterService.GlobalInterval = undefined;
    this.CharacterService.Rate = 0;
  }

  GetItemCount(item: Item) {
    var count = this.CharacterService.Character.Inventory.Items.find(i => i.Item.Name == item.Name)?.Count;
    if(count) return count;
    return 0;
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
