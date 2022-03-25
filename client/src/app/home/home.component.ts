import { Component, ElementRef, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Character } from '../model/character/character';
import { CraftHandler } from '../model/crafting/craft-handler';
import { GatherHandler } from '../model/gathering/gather-handler';
import { InventoryHandler } from '../model/inventory/inventory-handler';
import { Craftable } from '../model/items/craftable-items/craftable';
import { Gatherable } from '../model/items/gatherable-items/gatherable';
import { ItemType } from '../model/items/item';
import { DamageType, WeaponType } from '../model/items/craftable-items/weapon';
import { LevelHandler } from '../model/character/level-handler';
import { CharacterHandler } from '../model/character/character-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('activityLog', {static: false}) public ActivityLog!: ElementRef;
  @ViewChild('messageTextField', {static: false}) public MessageTextField!: ElementRef;
  @ViewChild('chatTextArea', {static: false}) public ChatTextArea!: ElementRef;

  CharacterHandler : CharacterHandler;
  SaveString!: string;
  IsBusy : boolean = false;
  GlobalInterval: any;
  CurrentOnlinePlayers : Character[] | undefined;
  ItemType = ItemType;
  DamageType = DamageType;
  WeaponType = WeaponType;
  TimerAmount: number = 100;

  constructor(private socket: Socket) {
    //TEMPORARY STORAGE
    var save = localStorage.getItem('character');
    if(save)
    {
      var character = JSON.parse(save);
      this.socket.emit("userSubmittedPlayerName", character);
    }
    else {
    }
    this.CharacterHandler = new CharacterHandler();
    this.CharacterHandler.Character = character;
   }

  public ngAfterViewInit() {
    this.SaveString = JSON.stringify(this.CharacterHandler.Character);
    this.socket.on('updateCharacterConnectionString', (socketId: any) => {
      this.CharacterHandler.Character.SocketId = socketId;
    });

    this.socket.on('currentOnlineCharacters', (currentOnlinePlayers: any) => {
      this.CurrentOnlinePlayers = currentOnlinePlayers;
    });

    this.socket.on('postChatMessage', (message: any) => {
      this.ChatTextArea.nativeElement.value = message + this.ChatTextArea.nativeElement.value;
    })
  }

  public OnSectionClick(event: any) {
    console.log(event.target.nextSibling.style.display);
    if(event.target.nextSibling.style.display == "block")
    {
      event.target.nextSibling.style.display == "none";
    }
    else if(event.target.nextSibling.style.display == "none")
    {
      event.target.nextSibling.style.display = "block";
    }
  }

  public onChatMessageEnter() {
    var chatMessage = new Date().toLocaleTimeString() + " " + this.CharacterHandler.Character.Name + " : " + this.MessageTextField.nativeElement.value + "\n";
    this.socket.emit("chatMessage", chatMessage);
    this.MessageTextField.nativeElement.value = "";
  }

  public onNameEnter(playerName: string) {
    this.CharacterHandler.Character = new Character(playerName);
    this.socket.emit("userSubmittedPlayerName", this.CharacterHandler.Character);
  }

  UpdateStorage() {
    this.SaveString = JSON.stringify(this.CharacterHandler.Character);
    localStorage.setItem('character', this.SaveString);
  }

  ResetCharacter() {
    (this.CharacterHandler.Character as any) = undefined;
    localStorage.clear();
  }

  OnAddXPClick() {
    this.CharacterHandler.Character.Experience = this.CharacterHandler.Character.Experience + 50;
    this.CharacterHandler.Character.Level = this.CharacterHandler.LevelHandler.CalculateLevel(this.CharacterHandler.Character.Experience);
    this.UpdateStorage();
  }

  OnDecreaseXPClick() {
    this.CharacterHandler.Character.Experience -= 50;
    this.CharacterHandler.Character.Level = this.CharacterHandler.LevelHandler.CalculateLevel(this.CharacterHandler.Character.Experience);
    this.UpdateStorage();
  }

  GatherItem(item: Gatherable) {
    if(this.IsBusy)
    {
      this.IsBusy = false;
      if(this.GlobalInterval != undefined) {
        clearInterval(this.GlobalInterval);
        this.GlobalInterval = undefined;
      }
    }
    else {
      if(this.CharacterHandler.GatherHandler.HasRequiredTool(item.RequiredTool, this.CharacterHandler.Character.Inventory))
      {
        if(item.LevelRequirement <= this.CharacterHandler.Character.Level) {
          this.IsBusy = true;
          this.GlobalInterval = setInterval(() => {
            this.CharacterHandler.GatherHandler.GatherItems(item, this.CharacterHandler.Character, this.CharacterHandler.Character.Inventory, this.ActivityLog);
            this.UpdateStorage();
          }, item.Rate * 1000)
        }
        else {
          this.ActivityLog.nativeElement.value = "You are not the required level to gather " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
        }
      }
      else {
        this.IsBusy = false;
        this.ActivityLog.nativeElement.value = "You do not possess the required tool to gather " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
      }

    }
  }

  CraftItem(item: Craftable) {
    if(this.IsBusy)
    {
      this.IsBusy = false;
      if(this.GlobalInterval != undefined) {
        clearInterval(this.GlobalInterval);
        this.GlobalInterval = undefined;
      }
    }
    else {
      if(this.CharacterHandler.CraftHandler.HasRequiredMaterials(this.CharacterHandler.Character.Inventory, item.Recipe))
      {
        if(item.LevelRequirement <= this.CharacterHandler.Character.Level) {
          this.IsBusy = true;
          this.GlobalInterval = setInterval(() => {
            this.CharacterHandler.CraftHandler.CraftItem(item, this.CharacterHandler.Character, this.CharacterHandler.Character.Inventory, this.ActivityLog);
            this.UpdateStorage();
          }, item.CraftTime * 1000)
        }
        else {
          this.ActivityLog.nativeElement.value = "You are not the required level to craft " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
        }
      }
      else {
        this.IsBusy = false;
        this.ActivityLog.nativeElement.value = "You do not possess the required materials to craft " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
      }

    }
  }

  CancelAction() {
    clearInterval(this.GlobalInterval);
    this.GlobalInterval = undefined;
  }

  AddItemToInventory(itemName: string) {
    this.CharacterHandler.InventoryHandler.AddItem(this.CharacterHandler.Character.Inventory.Items, itemName, this.ActivityLog);
    this.UpdateStorage();
  }

  RemoveItemFromInventory(itemName: string) {
    this.CharacterHandler.InventoryHandler.RemoveItem(this.CharacterHandler.Character.Inventory.Items, itemName, this.ActivityLog);
    this.UpdateStorage();
  }
}
