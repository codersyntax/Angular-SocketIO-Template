import { Component, ElementRef, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Character } from '../model/character';
import { CraftHandler } from '../model/crafting/craft-handler';
import { GatherHandler } from '../model/gathering/gather-handler';
import { InventoryHandler } from '../model/inventory/inventory-handler';
import { Craftable } from '../model/items/craftable-items/craftable';
import { Gatherable } from '../model/items/gatherable-items/gatherable';
import {  Item, ItemType } from '../model/items/item';
import { DamageType, WeaponType } from '../model/items/craftable-items/weapon';
import { LevelHandler } from '../model/leveling/level-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('activityLog', {static: false}) public ActivityLog!: ElementRef;
  @ViewChild('messageTextField', {static: false}) public MessageTextField!: ElementRef;
  @ViewChild('chatTextArea', {static: false}) public ChatTextArea!: ElementRef;

  Character : any;
  SaveString!: string;
  IsBusy : boolean = false;
  GlobalInterval: any;
  CurrentOnlinePlayers : Character[] | undefined;
  LevelHandler: LevelHandler;
  GatherHandler: GatherHandler;
  CraftHandler: CraftHandler;
  InventoryHandler: InventoryHandler;
  ItemType = ItemType;
  DamageType = DamageType;
  WeaponType = WeaponType;
  TimerAmount: number = 100;

  constructor(private socket: Socket) {
    this.LevelHandler = new LevelHandler();
    this.GatherHandler = new GatherHandler();
    this.CraftHandler = new CraftHandler();
    this.InventoryHandler = new InventoryHandler();
    //TEMPORARY STORAGE
    var save = localStorage.getItem('character');
    if(save)
    {
      this.Character = JSON.parse(save);
      this.socket.emit("userSubmittedPlayerName", this.Character);
    }
   }

  public ngAfterViewInit() {
    this.SaveString = JSON.stringify(this.Character);
    this.socket.on('updateCharacterConnectionString', (socketId: any) => {
      this.Character!.SocketId = socketId;
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
    var chatMessage = new Date().toLocaleTimeString() + " " + this.Character?.Name + " : " + this.MessageTextField.nativeElement.value + "\n";
    this.socket.emit("chatMessage", chatMessage);
    this.MessageTextField.nativeElement.value = "";
  }

  public onNameEnter(playerName: string) {
    this.Character = new Character(playerName);
    this.socket.emit("userSubmittedPlayerName", this.Character);
  }

  UpdateStorage() {
    this.SaveString = JSON.stringify(this.Character);
    localStorage.setItem('character', this.SaveString);
  }

  ResetCharacter() {
    this.Character = undefined;
    localStorage.clear();
  }

  OnAddXPClick() {
    this.Character.Experience = this.Character.Experience + 50;
    this.Character.Level = this.LevelHandler.CalculateLevel(this.Character.Experience);
    this.UpdateStorage();
  }

  OnDecreaseXPClick() {
    this.Character.Experience -= 50;
    this.Character.Level = this.LevelHandler.CalculateLevel(this.Character.Experience);
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
      if(this.GatherHandler.HasRequiredTool(item.RequiredTool, this.Character.Inventory))
      {
        this.IsBusy = true;
        this.GlobalInterval = setInterval(() => {
          this.GatherHandler.GatherItems(item, this.Character, this.Character.Inventory, this.ActivityLog);
          this.UpdateStorage();
        }, item.Rate * 1000)
      }
      else {
        this.IsBusy = false;
        this.ActivityLog.nativeElement.value = "You do not possess the required tool to gather " + item.Name + "\n" + this.ActivityLog.nativeElement.value;
      }

    }
  }

  CancelGather() {
    clearInterval(this.GlobalInterval);
    this.GlobalInterval = undefined;
  }

  CraftItem(item: Craftable) {
    this.CraftHandler.CraftItem(item, this.Character, this.Character.Inventory, this.ActivityLog);
    this.UpdateStorage();
  }

  AddItemToInventory(itemName: string) {
    this.Character.Inventory.Items = this.InventoryHandler.AddItem(this.Character.Inventory.Items, itemName, this.ActivityLog);
    this.UpdateStorage();
  }

  RemoveItemFromInventory(itemName: string) {
    this.Character.Inventory.Items = this.InventoryHandler.RemoveItem(this.Character.Inventory.Items, itemName, this.ActivityLog);
    this.UpdateStorage();
  }
}
