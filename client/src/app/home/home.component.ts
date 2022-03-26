import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../model/character/character';
import { ToastService } from '../toast.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('chatTextArea') public ChatTextArea!: ElementRef;
  @ViewChild('messageTextField') public MessageTextField!: ElementRef;
  CurrentOnlinePlayers : Character[] | undefined;
  
  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) {}


  ngAfterViewInit() {
    this.WebSocketService.socket.on('currentOnlineCharacters', (currentOnlinePlayers: any) => {
      this.CurrentOnlinePlayers = currentOnlinePlayers;
    });

    this.WebSocketService.socket.on('postChatMessage', (message: any) => {
      this.ChatTextArea.nativeElement.value = message + this.ChatTextArea.nativeElement.value;
    });
  }

  public onChatMessageEnter() {
    console.log(this.ToastService);
    var chatMessage = new Date().toLocaleTimeString() + " " + this.CharacterService.Character.Name + " : " + this.MessageTextField.nativeElement.value + "\n";
    this.WebSocketService.socket.emit("chatMessage", chatMessage);
    this.MessageTextField.nativeElement.value = "";
  }
}
