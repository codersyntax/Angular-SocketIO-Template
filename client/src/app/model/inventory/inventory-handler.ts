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

    public RemoveItem(items: InventoryItem[], itemName: string, activityLog: ElementRef): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].Item.Name == itemName)
            {
                items[i].Count--;
                activityLog.nativeElement.value = items[i].Item.Name + " removed from inventory\n" + activityLog.nativeElement.value;
                break;
            }
        }
        return items;
    }
}