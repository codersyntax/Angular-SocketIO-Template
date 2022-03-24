import { ElementRef } from "@angular/core";
import { GoldOre } from "../items/gold-ore";
import { Item } from "../items/item";
import { Stick } from "../items/stick";
import { Stone } from "../items/stone";
import { InventoryItem } from "./inventory-item";

export class InventoryHandler {
    public InventoryOptions: Item[] = [
        new Stick(),
        new Stone(),
        new GoldOre()
    ]

    public AddItem(items: InventoryItem[], itemName: string, activityLog: ElementRef): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].Item.Name == itemName) {
                items[i].Count++;
                activityLog.nativeElement.value = items[i].Item.Name + " add to inventory\n" + activityLog.nativeElement.value;
                break;
            }
        }
        return items;
    }

    public AddItemByObject(items: InventoryItem[], item: Item, activityLog: ElementRef): InventoryItem[] {
        if(items == undefined) return items;
        var itemIndex = items.findIndex(i => i.Item.Name == item.Name);
        if(itemIndex < 0)
        {
            var newItem = new InventoryItem(item);
            newItem.Count++;
            items.push(newItem);
            activityLog.nativeElement.value = newItem.Item.Name + " add to inventory\n" + activityLog.nativeElement.value;
            return items;
        }
        else {
            for(var i = 0; i < items.length; i++) {
                if(items[i].Item == item) {
                    items[i].Count++;
                    activityLog.nativeElement.value = items[i].Item.Name + " add to inventory\n" + activityLog.nativeElement.value;
                    break;
                }
            }
        }
        return items;
    }

    public RemoveItem(items: InventoryItem[], itemName: string, activityLog: ElementRef): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].Item.Name == itemName)
            {
                if(items[i].Count == 1)
                {
                    items = items.filter(t => t.Item.Name != itemName);
                }
                else {
                    items[i].Count--;
                }
                activityLog.nativeElement.value = itemName + " removed from inventory\n" + activityLog.nativeElement.value;
                break;
            }
        }
        return items;
    }
}