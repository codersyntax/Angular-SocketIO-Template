import { Item } from "../item";

export class RecipeItem {
    Item!: Item;
    Count!: number;

    constructor(private item: Item, private count: number) {
        this.Item = item;
        this.Count = count;
    }
}