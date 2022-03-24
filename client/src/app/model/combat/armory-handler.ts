import { ElementRef } from "@angular/core";
import { Item } from "../items/item";
import { Spear } from "../items/spear";
import { Weapon } from "../items/weapon";
import { ArmoryItem } from "./armory-item";

export class ArmoryHandler {
    public WeaponOptions: Weapon[] = [
        new Spear()
    ]
    
    public AddWeapon(items: ArmoryItem[], itemName: string, activityLog: ElementRef): ArmoryItem[] {
        for(var i = 0; i < items.length; i++) {
            if((items[i].Weapon as unknown as Item).Name == itemName) {
                items[i].Count++;
                activityLog.nativeElement.value = (items[i].Weapon as unknown as Item).Name + " added to armory\n" + activityLog.nativeElement.value;
            }
        }
        return items;
    }

    public RemoveWeapon(items: ArmoryItem[], itemName: string, activityLog: ElementRef): ArmoryItem[] {
        for(var i = 0; i < items.length; i++) {
            if((items[i].Weapon as unknown as Item).Name == itemName) {
                items[i].Count--;
                activityLog.nativeElement.value = (items[i].Weapon as unknown as Item).Name + " removed from armory\n" + activityLog.nativeElement.value;
            }
        }
        return items;
    }
}