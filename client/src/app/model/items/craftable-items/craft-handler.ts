import { ElementRef } from "@angular/core";
import { Character } from "../../character/character";
import { Inventory } from "../../inventory/inventory";
import { InventoryHandler } from "../../inventory/inventory-handler";
import { ItemType } from "../item";
import { Craftable } from "./craftable";
import { RecipeItem } from "./recipe-item";
import { WoodenPickaxe } from "./wooden-pickaxe";
import { WoodenSpear } from "./wooden-spear";
import { LevelHandler } from "../../character/level-handler";
import { StonePickaxe } from "./stone-pickaxe";
import { CopperPickaxe } from "./copper-pickaxe";
import { CopperIngot } from "./copper-ingot";
import { IronIngot } from "./iron-ingot";
import { IronPickaxe } from "./iron-pickaxe";

export class CraftHandler {
    private levelHandler = new LevelHandler();
    private inventoryHandler = new InventoryHandler();
    public CraftableItems: Craftable[] = [
        new WoodenPickaxe(),
        new WoodenSpear(),
        new StonePickaxe(),
        new CopperIngot(),
        new CopperPickaxe(),
        new IronIngot(),
        new IronPickaxe()
    ];

    public CraftItem(item: Craftable, player: Character, playerInventory: Inventory, activityLog: ElementRef) : Inventory {
        if(item.Type != ItemType.Material)
        {
            if(item.LevelRequirement <= player.Level) {
                var playerHaveRequiredMaterials = this.HasRequiredMaterials(playerInventory, item.Recipe)
                if(playerHaveRequiredMaterials)
                {
                    this.RemoveRequiredMaterials(playerInventory, item.Recipe);
                    this.inventoryHandler.AddItem(playerInventory.Items, item, activityLog);
                    activityLog.nativeElement.value = item.Name + " crafted and added to inventory\n" + activityLog.nativeElement.value;
                    player.Experience += item.Experience;
                    player.Level = this.levelHandler.CalculateLevel(player.Experience);
                    return playerInventory;
                }
                else
                {
                    activityLog.nativeElement.value = "You do not have all the required materials to create " + item.Name + "...\n" + activityLog.nativeElement.value;
                    return playerInventory;
                }
            }
            else {
                activityLog.nativeElement.value = "You are not the required level to create " + item.Name + "\n" + activityLog.nativeElement.value;
            }
        }
        return playerInventory;
    }

    public HasRequiredMaterials(inventory: Inventory, recipe: RecipeItem[]) : boolean {
        for(var i = 0; i < recipe.length; i++)
        {
            var requiredMaterialIndex = inventory.Items.findIndex(item => item.Item.Name == recipe[i].Item.Name);
            if(requiredMaterialIndex < 0)
            {
                return false;
            }
            if(inventory.Items[requiredMaterialIndex].Count < recipe[i].Count)
            {
                return false;
            }
        }
        return true;
    }

    private RemoveRequiredMaterials(inventory: Inventory, recipe: RecipeItem[]) {
        for(var i = 0; i < recipe.length; i++)
        {
            var requiredMaterialIndex = inventory.Items.findIndex(item => item.Item.Name == recipe[i].Item.Name);
            if(inventory.Items[requiredMaterialIndex].Count == recipe[i].Count)
            {
                inventory.Items = inventory.Items.filter(t => t.Item.Name != recipe[i].Item.Name);
            }
            else 
            {
                inventory.Items[requiredMaterialIndex].Count -= recipe[i].Count;
            }
        }
    }
}