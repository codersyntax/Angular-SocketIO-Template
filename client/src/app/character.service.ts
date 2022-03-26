import { ElementRef, Injectable } from '@angular/core';
import { Character } from './model/character/character';
import { HealthHandler } from './model/character/health-handler';
import { LevelHandler } from './model/character/level-handler';
import { InventoryHandler } from './model/inventory/inventory-handler';
import { CraftHandler } from './model/items/craftable-items/craft-handler';
import { GatherHandler } from './model/items/gatherable-items/gather-handler';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public Character : Character;
  public LevelHandler : LevelHandler = new LevelHandler();
  public HealthHandler : HealthHandler = new HealthHandler();
  public InventoryHandler: InventoryHandler = new InventoryHandler();

  public CraftHandler: CraftHandler = new CraftHandler();
  public GatherHandler: GatherHandler = new GatherHandler();
  public SaveString: string;
  IsBusy : boolean = false;
  GlobalInterval: any;

  constructor() {
    var save = localStorage.getItem('character');
    if(save)
    {
      var character = JSON.parse(save);
      this.Character = character;
    }
    else {
      this.Character = new Character("N7Soul");
    }
    this.SaveString = JSON.stringify(this.Character);
    this.LevelHandler.CalculateLevel(this.Character.Experience);
    this.HealthHandler.CalculateHealth(this.Character.Level);
  }

  public SetNewCharacter(characterName: string) {
    this.Character = new Character(characterName);
  }

  public SetExistingCharacter(character: Character) {
    this.Character = character;
  }
}
