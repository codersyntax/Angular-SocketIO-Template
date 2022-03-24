import { ElementRef } from "@angular/core";
import { Craftable } from "../items/craftable";
import { InventoryItem } from "./inventory-item";

export class InventoryHandler {
    public AddItem(items: InventoryItem[], characterLevel: number, itemName: string, activityLog: ElementRef): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].Item.Name == itemName)
            {
                if(items[i].Item.LevelRequirement > characterLevel)
                {
                    activityLog.nativeElement.value = "You are not the required level to perform this task...\n" + activityLog.nativeElement.value;
                    return items;
                }
                if(!items[i].Item.IsRawMaterial)
                {
                    var craftableItem = items[i].Item as unknown as Craftable;
                    var userHasAllMats = true;
                    for(var t = 0; t < craftableItem.Recipe.length; t++) 
                    {
                        var requiredMaterialIndex = items.findIndex(i => i.Item.Name == craftableItem.Recipe[t].Name);
                        var requiredNumberOfMaterialsForRecipe = craftableItem.Recipe.filter(j => j.Name == craftableItem.Recipe[t].Name).length;
                        if(items[requiredMaterialIndex].Count < requiredNumberOfMaterialsForRecipe)
                        {
                            userHasAllMats = false;
                            activityLog.nativeElement.value = "You do not have all the required materials to perform this craft...\n" + activityLog.nativeElement.value;
                            return items;
                        }
                    }
                    for(var t = 0; t < craftableItem.Recipe.length; t++) 
                    {
                        var requiredMaterialIndex = items.findIndex(i => i.Item.Name == craftableItem.Recipe[t].Name);
                        items[requiredMaterialIndex].Count--;
                    }
                    // Craftables
                    activityLog.nativeElement.value = items[i].Item.Name + " crafted and added to inventory\n" + activityLog.nativeElement.value;
                }
                else {
                    // Gatherables
                    activityLog.nativeElement.value = items[i].Item.Name + " gathered and added to inventory\n" + activityLog.nativeElement.value;
                }
                //Bump inventory count
                items[i].Count++;
                break;
            }
        }
        return items;
    }

    public RemoveItem(items: InventoryItem[], characterLevel: number, itemName: string, activityLog: ElementRef): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].Item.Name == itemName)
            {
                //Decrement inventory count
                items[i].Count--;
                activityLog.nativeElement.value = items[i].Item.Name + " removed from inventory\n" + activityLog.nativeElement.value;
                break;
            }
        }
        return items;
    }
}