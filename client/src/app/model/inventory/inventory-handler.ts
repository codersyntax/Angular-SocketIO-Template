import { Item } from "../items/item";
import { InventoryItem } from "./inventory-item";
import { Stick } from "../items/gatherable-items/stick";
import { Stone } from "../items/gatherable-items/stone";
import { GoldOre } from "../items/gatherable-items/gold-ore";
import { CopperOre } from "../items/gatherable-items/copper-ore";

export class InventoryHandler {
    public InventoryOptions: Item[] = [
        new Stick(),
        new Stone(),
        new CopperOre(),
        new GoldOre()
    ]

    public AddItem(items: InventoryItem[], item: Item): InventoryItem[] {
        if(items == undefined) return items;
        var itemIndex = items.findIndex(i => i.Item.Name == item.Name);
        if(itemIndex < 0)
        {
            var newItem = new InventoryItem(item);
            newItem.Count++;
            items.push(newItem);
            return items;
        }
        else {
            for(var i = 0; i < items.length; i++) {
                if(items[i].Item.Name == item.Name) {
                    items[i].Count++;
                    break;
                }
            }
        }
        return items;
    }

    public AddItems(items: InventoryItem[], item: Item, count: number): InventoryItem[] {
        if(items == undefined) return items;
        var itemIndex = items.findIndex(i => i.Item.Name == item.Name);
        if(itemIndex < 0)
        {
            var newItem = new InventoryItem(item);
            newItem.Count = newItem.Count + count;
            items.push(newItem);
            return items;
        }
        else {
            for(var i = 0; i < items.length; i++) {
                if(items[i].Item.Name == item.Name) {
                    items[i].Count = items[i].Count + count;
                    break;
                }
            }
        }
        return items;
    }

    public RemoveItem(items: InventoryItem[], item: Item): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].Item.Name == item.Name)
            {
                if(items[i].Count == 1)
                {
                    items = items.filter(t => t.Item.Name != item.Name);
                }
                else {
                    items[i].Count--;
                }
                break;
            }
        }
        return items;
    }

    public RemoveItems(items: InventoryItem[], item: Item, count: number): InventoryItem[] {
        if(items == undefined) return items;
        for(var i = 0; i < items.length; i++) {
            var inventoryItem = items[i];
            if(inventoryItem.Item.Name == item.Name)
            {
                if(count >= items[i].Count)
                {
                    items = items.filter(t => t.Item.Name != item.Name);
                    break;
                }
                else {
                    items[i].Count = items[i].Count - count;
                }
            }
        }
        return items;
    }
}