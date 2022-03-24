import { ElementRef } from "@angular/core";
import { Inventory } from "../inventory/inventory";
import { InventoryItem } from "../inventory/inventory-item";
import { Gatherable } from "../items/gatherable";
import { ItemType } from "../items/item";
import { Stick } from "../items/stick";
import { Stone } from "../items/stone";

export class GatherHandler {
    public GatherableItems: Gatherable[] = [
        new Stick(),
        new Stone()
    ];

    public GatherItems(item: Gatherable, playerLevel: number, playerInventory: Inventory, activityLog: ElementRef) : Inventory {
        if(item.Type == ItemType.Material)
        {
            if(item.LevelRequirement <= playerLevel) {
                this.AddGatheredItem(playerInventory, item);
                activityLog.nativeElement.value = item.Name + " gathered and added to inventory\n" + activityLog.nativeElement.value;
                return playerInventory;
            }
            else {
                activityLog.nativeElement.value = "You are not the required level to gather " + item.Name + "\n" + activityLog.nativeElement.value;
            }
        }
        return playerInventory;
    }

    private AddGatheredItem(inventory: Inventory, item: Gatherable) {
        var existingItemIndex = inventory.Items.findIndex(i => i.Item.Name == item.Name);
        if(existingItemIndex < 0)
        {
            var newItem = new InventoryItem(item)
            newItem.Count++;
            inventory.Items.push(newItem);
        }
        else {
            inventory.Items[existingItemIndex].Count++;
        }
    }
}