import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Character } from '../model/character';
import { ArmoryHandler } from '../model/combat/armory-handler';
import { CraftHandler } from '../model/crafting/CraftHandler';
import { InventoryHandler } from '../model/inventory/inventory-handler';
import { Item, ItemType } from '../model/items/item';
import { DamageType, WeaponType } from '../model/items/weapon';

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
  CurrentOnlinePlayers : Character[] | undefined;
  CraftHandler: CraftHandler;
  InventoryHandler: InventoryHandler;
  ArmoryHandler: ArmoryHandler;
  ItemType = ItemType;
  DamageType = DamageType;
  WeaponType = WeaponType;

  constructor(private socket: Socket) {
    this.CraftHandler = new CraftHandler();
    this.InventoryHandler = new InventoryHandler();
    this.ArmoryHandler = new ArmoryHandler();
    //TEMPORARY STORAGE
    var save = localStorage.getItem('character');
    if(save)
    {
      this.Character = JSON.parse(save);
      this.socket.emit("userSubmittedPlayerName", this.Character);
    }
   }

  public ngAfterViewInit() {
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
    var previousActiveElement = event.target.parentElement.querySelector(".active");
    if(previousActiveElement)
    {
      previousActiveElement.classList.remove("active");
      previousActiveElement.nextSibling.style.display = "none";
    }
    event.target.className += " active";
    event.target.nextSibling.style.display = "block";
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
    localStorage.setItem('character', JSON.stringify(this.Character));
  }

  ResetCharacter() {
    this.Character = undefined;
    localStorage.clear();
  }

  CraftItem(item: Item) {
    this.CraftHandler.CraftItem(item, this.Character.Level, this.Character.Inventory, this.Character.Armory, this.ActivityLog);
    this.UpdateStorage();
  }

  AddItemToArmory(itemName: string) {
    this.Character.Armory.Items = this.ArmoryHandler.AddWeapon(this.Character.Armory.Items, itemName, this.ActivityLog);
    this.UpdateStorage();
  }

  RemoveItemFromArmory(itemName: string) {
    this.Character.Armory.Items = this.ArmoryHandler.RemoveWeapon(this.Character.Armory.Items, itemName, this.ActivityLog);
    this.UpdateStorage();
  }

  AddItemToInventory(itemName: string) {
    console.log(itemName);
    this.Character.Inventory.Items = this.InventoryHandler.AddItem(this.Character.Inventory.Items, itemName, this.ActivityLog);
    console.log(this.Character);
    this.UpdateStorage();
  }

  RemoveItemFromInventory(itemName: string) {
    this.Character.Inventory.Items = this.InventoryHandler.RemoveItem(this.Character.Inventory, itemName, this.ActivityLog);
    this.UpdateStorage();
  }
}
