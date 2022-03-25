import { ElementRef } from "@angular/core";
import { Character } from "../../character/character";
import { Inventory } from "../../inventory/inventory";
import { InventoryHandler } from "../../inventory/inventory-handler";
import { Gatherable, GatherType } from "./gatherable";
import { ItemType } from "../item";
import { Stick } from "./stick";
import { Stone } from "./stone";
import { GoldOre } from "./gold-ore";
import { Tool, ToolType } from "../craftable-items/tool";
import { LevelHandler } from "../../character/level-handler";
import { CopperOre } from "./copper-ore";
import { UseType } from "../craftable-items/craftable";

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
            this.inventoryHandler.AddItemByObject(playerInventory.Items, item, activityLog);
            activityLog.nativeElement.value = item.Name + " gathered\n" + activityLog.nativeElement.value;
            player.Experience += item.Experience;
            player.Level = this.levelHandler.CalculateLevel(player.Experience);
            return playerInventory;
        }
        return playerInventory;
    }

    public HasRequiredTool(requiredTool: Tool | undefined, playerInventory: Inventory) {
        if(requiredTool == undefined) return true;
        var playerTool = playerInventory.Items.filter(item => item.Item.Name == requiredTool.Name);
        if(playerTool.length > 0) return true;
        return false;
    }

    public DetermineGatherRate(inventory: Inventory, item: Gatherable) {
        var gatherRate;
        switch(item.GatherType)
        {
          case GatherType.Mining:
            var highestTierTool = this.GetHighestTierTool(inventory, ToolType.Mining);
            gatherRate = (item.Rate / highestTierTool.Multiplyer) * 1000;
            break;
          case GatherType.Botany:
            var highestTierTool = this.GetHighestTierTool(inventory, ToolType.Botany);
            gatherRate = (item.Rate / highestTierTool.Multiplyer) * 1000;
            break;
          default:
            gatherRate = item.Rate * 1000;
            break;
        }
        return gatherRate;
    }

    public GetHighestTierTool(inventory: Inventory, type: ToolType) : Tool {
        var tools = inventory.Items.filter(item => item.Item.Type == ItemType.Tool);
        var typeTools = tools.filter(item => (item.Item as unknown as Tool).ToolType == type);
        var currentMaxLevelTool = Math.max.apply(Math, typeTools.map(function(o) { return o.Item.LevelRequirement; }))
        return (typeTools.find(tool => tool.Item.LevelRequirement == currentMaxLevelTool)?.Item as unknown as Tool);
    }
}