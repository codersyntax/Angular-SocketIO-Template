import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { CharacterService } from '../character.service';
import { WebSocketService } from '../web-socket.service';
import { ItemType } from '../model/items/item';
import { Gatherable } from '../model/items/gatherable-items/gatherable';

@Component({
  selector: 'app-gather',
  templateUrl: './gather.component.html',
  styleUrls: ['./gather.component.css']
})
export class GatherComponent implements OnInit {

  ItemType = ItemType;
  
  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) { }

  ngOnInit(): void {
  }

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
        if(item.LevelRequirement <= this.CharacterService.Character.Level) {
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

  CancelAction() {
    clearInterval(this.CharacterService.GlobalInterval);
    this.CharacterService.GlobalInterval = undefined;
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
