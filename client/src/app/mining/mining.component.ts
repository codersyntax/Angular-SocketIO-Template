import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { CharacterService } from '../character.service';
import { WebSocketService } from '../web-socket.service';
import { Item, ItemType } from '../model/items/item';
import { Gatherable, GatherType } from '../model/items/gatherable-items/gatherable';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent {

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
        if(item.LevelRequirement <= this.CharacterService.Character.Skills.MiningLevel) {
          this.CharacterService.IsBusy = true;
          var gatherRate = this.CharacterService.GatherHandler.DetermineGatherRate(this.CharacterService.Character.Inventory, item);
          this.CharacterService.GlobalInterval = setInterval(() => {
            this.CharacterService.GatherHandler.GatherItems(item, this.CharacterService.Character, this.CharacterService.Character.Inventory);
            this.UpdateStorage();
            this.ToastService.UpdateToast("Received " + item.Experience + "xp from gathering " + item.Name);
          }, gatherRate)
        }
        else {
          this.ToastService.UpdateToast("You are not the required level to gather " + item.Name);
        }
      }
      else {
        this.CharacterService.IsBusy = false;
        this.ToastService.UpdateToast("You do not possess the required tool to gather " + item.Name);
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
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }

}
