import { ElementRef } from "@angular/core";
import { InventoryItem } from "./inventory-item";

export class InventoryHandler {

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