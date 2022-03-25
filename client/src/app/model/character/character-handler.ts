import { CraftHandler } from "../crafting/craft-handler";
import { GatherHandler } from "../gathering/gather-handler";
import { InventoryHandler } from "../inventory/inventory-handler";
import { Character } from "./character";
import { HealthHandler } from "./health-handler";
import { LevelHandler } from "./level-handler";

export class CharacterHandler {
    public Character! : Character;

    public LevelHandler : LevelHandler = new LevelHandler();
    public HealthHandler : HealthHandler = new HealthHandler();
    public InventoryHandler: InventoryHandler = new InventoryHandler();

    public CraftHandler: CraftHandler = new CraftHandler();
    public GatherHandler: GatherHandler = new GatherHandler();

    constructor() {
        this.LevelHandler.CalculateLevel(this.Character?.Experience);
        this.HealthHandler.CalculateHealth(this.Character?.Level);
    }
}