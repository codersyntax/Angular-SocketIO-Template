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
  @ViewChild('messageTextField') public MessageTextField!: ElementRef;
  @ViewChild('chatTextArea') public ChatTextArea!: ElementRef;
  
  SaveString!: string;
  CurrentOnlinePlayers : Character[] | undefined;
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

    this.WebSocketService.socket.on('currentOnlineCharacters', (currentOnlinePlayers: any) => {
      this.CurrentOnlinePlayers = currentOnlinePlayers;
    });

    this.WebSocketService.socket.on('postChatMessage', (message: any) => {
      this.ChatTextArea.nativeElement.value = message + this.ChatTextArea.nativeElement.value;
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

  public onChatMessageEnter() {
    console.log(this.ToastService);
    var chatMessage = new Date().toLocaleTimeString() + " " + this.CharacterService.Character.Name + " : " + this.MessageTextField.nativeElement.value + "\n";
    this.WebSocketService.socket.emit("chatMessage", chatMessage);
    this.MessageTextField.nativeElement.value = "";
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