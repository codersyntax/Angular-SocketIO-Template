import { Gatherable } from "./gatherable";
import { Item, ItemType } from "./item";

export class Stone implements Item, Gatherable 
{
    public Name: string = "Stone";
    public Type: ItemType = ItemType.Material;
    public Description: string = "Its a rock...";
    public Value: number = 1;
    public IsRawMaterial: boolean = true;
    public LevelRequirement: number = 1;
}