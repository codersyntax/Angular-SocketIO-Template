import { Spear } from "../items/spear";
import { ArmoryItem } from "./armory-item";

export class Armory {
    public Items: ArmoryItem[] = [
        new ArmoryItem(new Spear())
    ];
}