import { Component, HostListener } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Character } from '../model/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Character : Character | undefined;
  CurrentOnlinePlayers : Character[] | undefined;

  constructor(private socket: Socket) {
   }

  public ngAfterViewInit() {
    this.socket.on('successful-transmission', (data: any) => {
      console.log("Returned data from server: ", data);
    });

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

  ngOnDestroy(): void {
    this.socket.emit('logCharacterOut', this.Character);
  }
}
