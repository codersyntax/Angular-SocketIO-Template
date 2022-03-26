import { Component } from '@angular/core';
import { CharacterService } from '../character.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-home',
  providers: [
    WebSocketService,
    CharacterService
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public CharacterService: CharacterService, private WebSocketService: WebSocketService) {}

  public ngOnInit(): void {
    console.log(this.CharacterService);
    // //TEMPORARY STORAGE
    // var save = localStorage.getItem('character');
    // if(save)
    // {
    //   var character = JSON.parse(save);
    //   //this.WebSocketService.socket.emit("userSubmittedPlayerName", character);
    //   this.CharacterService.SetExistingCharacter(character);
    // }
  }

  ResetCharacter() {
    (this.CharacterService.Character as any) = undefined;
    localStorage.clear();
  }

  OnAddXPClick() {
    this.CharacterService.Character.Experience = this.CharacterService.Character.Experience + 50;
    this.CharacterService.Character.Level = this.CharacterService.LevelHandler.CalculateLevel(this.CharacterService.Character.Experience);
    this.UpdateStorage();
  }

  OnDecreaseXPClick() {
    this.CharacterService.Character.Experience -= 50;
    this.CharacterService.Character.Level = this.CharacterService.LevelHandler.CalculateLevel(this.CharacterService.Character.Experience);
    this.UpdateStorage();
  }

  UpdateStorage() {
    localStorage.setItem('character', JSON.stringify(this.CharacterService.Character));
  }
}
