import { ElementRef } from "@angular/core";
import { Armory } from "../combat/armory";
import { Inventory } from "../inventory/inventory";
import { Craftable } from "../items/craftable";
import { Gatherable } from "../items/gatherable";
import { Item, ItemType } from "../items/item";

export class CraftHandler {
    public CraftItem(item: Item, playerLevel: number, playerInventory: Inventory, playerArmory: Armory, activityLog: ElementRef) : Inventory {
        if(item.Type != ItemType.Material)
        {
            if(item.LevelRequirement >= playerLevel) {
                var playerHaveRequiredMaterials = this.HasRequiredMaterials(playerInventory, (item as unknown as Craftable).Recipe)
                if(playerHaveRequiredMaterials)
                {
                    this.RemoveRequiredMaterials(playerInventory, (item as unknown as Craftable).Recipe);
                    this.AddCraftedItem(playerArmory, playerInventory, item);
                    activityLog.nativeElement.value = item.Name + " crafted and added to inventory\n" + activityLog.nativeElement.value;
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

    private HasRequiredMaterials(inventory: Inventory, recipe: Gatherable[]) : boolean {
        for(var i = 0; i < recipe.length; i++)
        {
            var requiredMaterialIndex = inventory.Items.findIndex(item => item.Item.Name == recipe[i].Name);
            var requiredNumberOfMaterialsForRecipe = recipe.filter(item => item.Name == recipe[i].Name).length;
            if(inventory.Items[requiredMaterialIndex].Count < requiredNumberOfMaterialsForRecipe)
            {
                return false;
            }
        }
        return true;
    }

    private RemoveRequiredMaterials(inventory: Inventory, recipe: Gatherable[]) {
        for(var i = 0; i < recipe.length; i++)
        {
            var requiredMaterialIndex = inventory.Items.findIndex(item => item.Item.Name == recipe[i].Name);
            inventory.Items[requiredMaterialIndex].Count--;
        }
    }

    private AddCraftedItem(armory: Armory, inventory: Inventory, item: Item) {
        if(item.Type == ItemType.Weapon) 
        {
            var itemIndex = armory.Items.findIndex(i => (i.Weapon as unknown as Item).Name == item.Name);
            armory.Items[itemIndex].Count++;
        }
        else {
            var itemIndex = inventory.Items.findIndex(i => i.Item.Name == item.Name);
            inventory.Items[itemIndex].Count++;
        }
    }
}