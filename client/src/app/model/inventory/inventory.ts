import { Spear } from "../items/spear";
import { Stick } from "../items/stick";
import { Stone } from "../items/stone";
import { InventoryItem } from "./inventory-item";

export class Inventory {
    public Items: InventoryItem[] = [
        new InventoryItem(new Stone()),
        new InventoryItem(new Stick()),
        new InventoryItem(new Spear())
    ];
}