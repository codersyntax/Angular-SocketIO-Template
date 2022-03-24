import { Gatherable } from "./gatherable";
import { Item } from "./item";

export class Stick implements Item, Gatherable 
{
    public Name: string = "Stick";
    public Description: string = "Its a stick...";
    public Value: number = 1;
    public IsRawMaterial: boolean = true;
    public LevelRequirement: number = 1;
}