import { Item } from "../items/item";

export class InventoryItem {
    public Item!: Item;
    public Count: number = 0;

    constructor(item: Item) {
        this.Item = item;
    }
}