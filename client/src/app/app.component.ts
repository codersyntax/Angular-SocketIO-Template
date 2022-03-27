import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { CharacterService } from './character.service';
import { Character } from './model/character/character';
import { ItemType } from './model/items/item';
import { ToastService } from './toast.service';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  SaveString!: string;
  ItemType = ItemType;

  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) {
  }

  public ngOnInit(): void {
    this.WebSocketService.socket.emit("userSubmittedPlayerName", this.CharacterService.Character);
  }

  public ngAfterViewInit() {   
    this.WebSocketService.socket.on('updateCharacterConnectionString', (socketId: any) => {
      this.CharacterService.Character.SocketId = socketId;
    });
  }

  public OnSelect(e: any) {
    var siblings = e.target.parentElement.children;
    for(var i = 0; i < siblings.length; i++) {
      if(siblings[i].className == "active") {
        siblings[i].className = "";
      }
    }
    e.target.className = "active";
  }

  public DetermineAnimation() {
    if(this.CharacterService.Rate == 0) {
      return "";
    }
    else {
      return "animation: prog " + this.CharacterService.Rate / 1000 + "s linear infinite";
    }
  }

  public onNameEnter(playerName: string) {
    this.CharacterService.SetNewCharacter(playerName);
    this.WebSocketService.socket.emit("userSubmittedPlayerName", this.CharacterService.Character);
  }

  ResetCharacter() {
    (this.CharacterService.Character as any) = undefined;
    localStorage.clear();
  }

  UpdateStorage() {
    this.SaveString = JSON.stringify(this.CharacterService.Character);
    localStorage.setItem('character', this.SaveString);
  }
}