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
import { IronOre } from "./iron-ore";
import { Wheat } from "./wheat";
import { Cotton } from "./cotton";

export class GatherHandler {
    private levelHandler = new LevelHandler();
    private inventoryHandler = new InventoryHandler();
    public GatherableItems: Gatherable[] = [
        new GoldOre(),
        new IronOre(),
        new Cotton(),
        new CopperOre(),
        new Stone(),
        new Wheat(),
        new Stick()
    ];

    public GatherItems(item: Gatherable, player: Character, playerInventory: Inventory) : Inventory {
        if(item.Type == ItemType.Material)
        {
            this.inventoryHandler.AddItem(playerInventory.Items, item);
            switch(item.GatherType) {
                case GatherType.Mining:
                    player.Skills.MiningXP += item.Experience;
                    player.Skills.MiningLevel = this.levelHandler.CalculateLevel(player.Skills.MiningXP);
                    break;
                case GatherType.Botany:
                    player.Skills.BotanyXP += item.Experience;
                    player.Skills.BotanyLevel = this.levelHandler.CalculateLevel(player.Skills.BotanyXP);
                    break;
                case GatherType.Farming:
                    player.Skills.FarmingXP += item.Experience;
                    player.Skills.FarmingLevel = this.levelHandler.CalculateLevel(player.Skills.FarmingXP);
                    break;
                case GatherType.Fishing:
                    player.Skills.FishingXP += item.Experience;
                    player.Skills.FishingLevel = this.levelHandler.CalculateLevel(player.Skills.FishingXP);
                    break;
            }
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
            if(highestTierTool)
            {
                gatherRate = (item.Rate / highestTierTool.Multiplyer) * 1000;
            }
            else {
                gatherRate = item.Rate * 1000;
            }
            break;
          case GatherType.Botany:
            var highestTierTool = this.GetHighestTierTool(inventory, ToolType.Botany);
            if(highestTierTool)
            {
                gatherRate = (item.Rate / highestTierTool.Multiplyer) * 1000;
            }
            else {
                gatherRate = item.Rate * 1000;
            }
            break;
          default:
            gatherRate = item.Rate * 1000;
            break;
        }
        //gatherRate = Math.floor(gatherRate / 1000) * 1000;
        return gatherRate;
    }

    public GetHighestTierTool(inventory: Inventory, type: ToolType) : Tool | undefined {
        if(inventory.Items.length == 0) return undefined;
        var tools = inventory.Items.filter(item => item.Item.Type == ItemType.Tool);
        if(tools.length == 0) return undefined;
        var typeTools = tools.filter(item => (item.Item as unknown as Tool).ToolType == type);
        var currentMaxLevelTool = Math.max.apply(Math, typeTools.map(function(o) { return o.Item.LevelRequirement; }))
        return (typeTools.find(tool => tool.Item.LevelRequirement == currentMaxLevelTool)?.Item as unknown as Tool);
    }
}