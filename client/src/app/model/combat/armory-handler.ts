import { ElementRef } from "@angular/core";
import { Item } from "../items/item";
import { ArmoryItem } from "./armory-item";

export class ArmoryHandler {
    public AddWeapon(items: ArmoryItem[], itemName: string, activityLog: ElementRef): ArmoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if((items[i].Weapon as unknown as Item).Name == itemName)
            {
                //Handle crafting of weapons
                //Increase armory item count
                items[i].Count++;
                activityLog.nativeElement.value = (items[i].Weapon as unknown as Item).Name + " added to armory\n" + activityLog.nativeElement.value;
                break;
            }
        }
        return items;
    }

    public RemoveWeapon(items: ArmoryItem[], itemName: string, activityLog: ElementRef): ArmoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if((items[i].Weapon as unknown as Item).Name == itemName)
            {
                //Handle crafting of weapons
                //Decrease armory item count
                items[i].Count--;
                activityLog.nativeElement.value = (items[i].Weapon as unknown as Item).Name + " removed from armory\n" + activityLog.nativeElement.value;
                break;
            }
        }
        return items;
    }
}