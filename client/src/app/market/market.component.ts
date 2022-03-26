import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Market } from '../model/market/market';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-market',
  providers: [ 
    WebSocketService,
    CharacterService
  ],
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  Market: Market;

  constructor(private router: Router, public CharacterService: CharacterService, private WebSocketService: WebSocketService) { 
    this.Market = new Market();

    var save = localStorage.getItem('character');
    if(save)
    {
      var character = JSON.parse(save);
      this.WebSocketService.socket.emit("userSubmittedPlayerName", character);
      this.CharacterService.SetExistingCharacter(character);
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.WebSocketService.socket.emit("GetMarketData");
  }

  ngAfterViewInit(): void {
    this.WebSocketService.socket.on('UpdateMarket', (market: any) => {
      this.Market.Listings = JSON.parse(market);
    });
  }

}
