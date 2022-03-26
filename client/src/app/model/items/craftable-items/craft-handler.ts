import { Character } from "../../character/character";
import { Inventory } from "../../inventory/inventory";
import { InventoryHandler } from "../../inventory/inventory-handler";
import { ItemType } from "../item";
import { Craftable, UseType } from "./craftable";
import { RecipeItem } from "./recipe-item";
import { WoodenPickaxe } from "./wooden-pickaxe";
import { WoodenSpear } from "./wooden-spear";
import { LevelHandler } from "../../character/level-handler";
import { StonePickaxe } from "./stone-pickaxe";
import { CopperPickaxe } from "./copper-pickaxe";
import { CopperIngot } from "./copper-ingot";
import { IronIngot } from "./iron-ingot";
import { IronPickaxe } from "./iron-pickaxe";
import { WoodenAxe } from "./wooden-axe";
import { WoodenScythe } from "./wooden-scythe";
import { StoneScythe } from "./stone-scythe";

export class CraftHandler {
    private levelHandler = new LevelHandler();
    private inventoryHandler = new InventoryHandler();
    public CraftableItems: Craftable[] = [
        new IronPickaxe(),
        new IronIngot(),
        new CopperPickaxe(),
        new CopperIngot(),
        new StoneScythe(),
        new StonePickaxe(),
        new WoodenSpear(),
        new WoodenScythe(),
        new WoodenAxe(),
        new WoodenPickaxe
    ];

    public CraftItem(item: Craftable, player: Character, playerInventory: Inventory) : Inventory {
        this.RemoveRequiredMaterials(playerInventory, item.Recipe);
        this.inventoryHandler.AddItem(playerInventory.Items, item);
        switch(item.ExperienceType) {
            case UseType.Alchemy:
                player.Skills.AlchemyXP += item.Experience;
                player.Skills.AlchemyLevel = this.levelHandler.CalculateLevel(player.Skills.AlchemyXP);
                break;
            case UseType.Cooking:
                player.Skills.CookingXP += item.Experience;
                player.Skills.CookingLevel = this.levelHandler.CalculateLevel(player.Skills.CookingXP);
                break;
            case UseType.Smithing:
                player.Skills.SmithingXP += item.Experience;
                player.Skills.SmithingLevel = this.levelHandler.CalculateLevel(player.Skills.SmithingXP);
                break;
            case UseType.Weaponsmithing:
                player.Skills.WeaponsmithingXP += item.Experience;
                player.Skills.WeaponsmithingLevel = this.levelHandler.CalculateLevel(player.Skills.WeaponsmithingXP);
                break;
            case UseType.Armorer:
                player.Skills.ArmorerXP += item.Experience;
                player.Skills.ArmorerLevel = this.levelHandler.CalculateLevel(player.Skills.ArmorerXP);
                break;
            case UseType.Weaver:
                player.Skills.WeaverXP += item.Experience;
                player.Skills.WeaverLevel = this.levelHandler.CalculateLevel(player.Skills.WeaverXP);
                break;
            case UseType.Goldsmithing:
                player.Skills.GoldsmithingXP += item.Experience;
                player.Skills.GoldsmithingLevel = this.levelHandler.CalculateLevel(player.Skills.GoldsmithingXP);
                break;
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