import { CraftHandler } from "../items/craftable-items/craft-handler";
import { GatherHandler } from "../items/gatherable-items/gather-handler";
import { InventoryHandler } from "../inventory/inventory-handler";
import { Tool, ToolType } from "../items/craftable-items/tool";
import { ItemType } from "../items/item";
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