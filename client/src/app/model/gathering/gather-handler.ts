import { ElementRef } from "@angular/core";
import { Character } from "../character";
import { Inventory } from "../inventory/inventory";
import { InventoryHandler } from "../inventory/inventory-handler";
import { InventoryItem } from "../inventory/inventory-item";
import { Gatherable } from "../items/gatherable";
import { GoldOre } from "../items/gold-ore";
import { ItemType } from "../items/item";
import { Stick } from "../items/stick";
import { Stone } from "../items/stone";
import { LevelHandler } from "../leveling/level-handler";

export class GatherHandler {
    private levelHandler = new LevelHandler();
    private inventoryHandler = new InventoryHandler();
    public GatherableItems: Gatherable[] = [
        new Stick(),
        new Stone(),
        new GoldOre()
    ];

    public GatherItems(item: Gatherable, player: Character, playerInventory: Inventory, activityLog: ElementRef) : Inventory {
        if(item.Type == ItemType.Material)
        {
            if(item.LevelRequirement <= player.Level) {
                this.inventoryHandler.AddItemByObject(playerInventory.Items, item, activityLog);
                activityLog.nativeElement.value = item.Name + " gathered\n" + activityLog.nativeElement.value;
                player.Experience += item.Experience;
                player.Level = this.levelHandler.CalculateLevel(player.Experience);
                return playerInventory;
            }
            else {
                activityLog.nativeElement.value = "You are not the required level to gather " + item.Name + "\n" + activityLog.nativeElement.value;
            }
        }
        return playerInventory;
    }
}