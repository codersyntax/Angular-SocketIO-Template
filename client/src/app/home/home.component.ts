import { Component, Injectable } from '@angular/core';
import { CharacterService } from '../character.service';
import { ToastService } from '../toast.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) {}
}
