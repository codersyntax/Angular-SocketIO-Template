import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  PlayerName = '';

  constructor(private socket: Socket) { }

  public ngAfterViewInit() {
    this.socket.on('successful-transmission', (data: any) => {
      console.log("Returned data from server: ", data);
    })
  }

  public onNameEnter(playerName: string) {
    this.PlayerName = playerName;
    this.socket.emit("userSubmittedPlayerName", playerName);
  }

}
