import { Craftable } from "./craftable";
import { Item } from "./item";
import { Stick } from "./stick";
import { Stone } from "./stone";

export class Spear implements Item, Craftable 
{
    public Name: string = "Spear";
    public Description: string = "Its a spear...";
    public Value: number = 3;
    public IsRawMaterial: boolean = false;
    public Recipe: any = [new Stone(), new Stick(), new Stick()];
    public LevelRequirement: number = 3;
}