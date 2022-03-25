import { Character } from "../character/character";
import { Item } from "../items/item";

export class MarketItem {
    constructor(public ListingOwner: Character, public Item: Item, public Count: number, public Price: number) {

    }
}