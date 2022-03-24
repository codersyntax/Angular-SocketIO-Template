import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Character } from '../model/character';
import { InventoryHandler } from '../model/inventory/inventory-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('activityLog', {static: false}) public ActivityLog!: ElementRef;
  Character : any;
  CurrentOnlinePlayers : Character[] | undefined;
  InventoryHandler: InventoryHandler;

  constructor(private socket: Socket) {
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
    this.socket.on('updateCharacterConnectionString', (socketId: any) => {
      this.Character!.SocketId = socketId;
    });

    this.socket.on('currentOnlineCharacters', (currentOnlinePlayers: any) => {
      this.CurrentOnlinePlayers = currentOnlinePlayers;
    });
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

  AddItemToInventory(itemName: string) {
    this.Character.Inventory.Items = this.InventoryHandler.AddItem(this.Character.Inventory.Items, this.Character.Level, itemName, this.ActivityLog);
    this.UpdateStorage();
  }

  RemoveItemFromInventory(itemName: string) {
    this.Character.Inventory.Items = this.InventoryHandler.RemoveItem(this.Character.Inventory.Items, this.Character.Level, itemName, this.ActivityLog);
    this.UpdateStorage();
  }
}
