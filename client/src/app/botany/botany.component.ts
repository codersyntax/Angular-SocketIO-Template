import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { CharacterService } from '../character.service';
import { WebSocketService } from '../web-socket.service';
import { Item, ItemType } from '../model/items/item';
import { Gatherable, GatherType } from '../model/items/gatherable-items/gatherable';

@Component({
  selector: 'app-botany',
  templateUrl: './botany.component.html',
  styleUrls: ['./botany.component.css']
})
export class BotanyComponent {

  ItemType = ItemType;
  GatherType = GatherType;

  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) { }

  GatherItem(item: Gatherable) {
    if(this.CharacterService.IsBusy)
    {
      this.CharacterService.IsBusy = false;
      if(this.CharacterService.GlobalInterval != undefined) {
        clearInterval(this.CharacterService.GlobalInterval);
        this.CharacterService.GlobalInterval = undefined;
      }
    }
    else {
      if(this.CharacterService.GatherHandler.HasRequiredTool(item.RequiredTool, this.CharacterService.Character.Inventory))
      {
        if(item.LevelRequirement <= this.CharacterService.Character.Skills.BotanyLevel) {
          this.CharacterService.IsBusy = true;
          var gatherRate = this.CharacterService.GatherHandler.DetermineGatherRate(this.CharacterService.Character.Inventory, item);
          this.CharacterService.Rate = gatherRate;
          this.CharacterService.GlobalInterval = setInterval(() => {
            this.CharacterService.GatherHandler.GatherItems(item, this.CharacterService.Character, this.CharacterService.Character.Inventory);
            this.UpdateStorage();
            this.ToastService.UpdateToast("Received " + item.Experience + " botany xp from harvesting " + item.Name);
          }, gatherRate)
        }
        else {
          this.ToastService.UpdateToast("You are not the required level to harvest " + item.Name);
        }
      }
      else {
        this.CharacterService.IsBusy = false;
        this.ToastService.UpdateToast("You do not possess the required tool to harvest " + item.Name);
      }

    }
  }

  GetItemCount(item: Item) {
    var count = this.CharacterService.Character.Inventory.Items.find(i => i.Item.Name == item.Name)?.Count;
    if(count) return count;
    return 0;
  }

  CancelAction() {
    clearInterval(this.CharacterService.GlobalInterval);
    this.CharacterService.GlobalInterval = undefined;
    this.CharacterService.Rate = 0;
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }

}
