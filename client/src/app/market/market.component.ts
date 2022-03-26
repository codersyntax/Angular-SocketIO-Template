import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Market } from '../model/market/market';
import { ToastService } from '../toast.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  Market: Market;

  constructor(public ToastService: ToastService, public CharacterService: CharacterService, private WebSocketService: WebSocketService) { 
    this.Market = new Market();
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
