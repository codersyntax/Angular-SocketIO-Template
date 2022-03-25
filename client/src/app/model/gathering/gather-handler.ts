import { ElementRef } from "@angular/core";
import { Character } from "../character";
import { Inventory } from "../inventory/inventory";
import { InventoryHandler } from "../inventory/inventory-handler";
import { Gatherable } from "../items/gatherable-items/gatherable";
import { ItemType } from "../items/item";
import { Stick } from "../items/gatherable-items/stick";
import { Stone } from "../items/gatherable-items/stone";
import { GoldOre } from "../items/gatherable-items/gold-ore";
import { Tool } from "../items/craftable-items/tool";
import { LevelHandler } from "../leveling/level-handler";
import { CopperOre } from "../items/gatherable-items/copper-ore";

export class GatherHandler {
    private levelHandler = new LevelHandler();
    private inventoryHandler = new InventoryHandler();
    public GatherableItems: Gatherable[] = [
        new Stick(),
        new Stone(),
        new CopperOre(),
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

    public HasRequiredTool(requiredTool: Tool | undefined, playerInventory: Inventory) {
        if(requiredTool == undefined) return true;
        var playerTool = playerInventory.Items.filter(item => item.Item.Name == requiredTool.Name);
        if(playerTool.length > 0) return true;
        return false;
    }
}