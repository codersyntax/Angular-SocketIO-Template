import { Gatherable } from "./gatherable";
import { Item, ItemType } from "./item";

export class Stick implements Item, Gatherable 
{
    public Name: string = "Stick";
    public Experience: number = 10;
    public Type: ItemType = ItemType.Material;
    public Description: string = "Its a stick...";
    public Value: number = 1;
    public IsRawMaterial: boolean = true;
    public LevelRequirement: number = 0;
    public Rate: number = 1;
}