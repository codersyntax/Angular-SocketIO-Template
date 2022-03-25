import { Gatherable } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";
import { WoodenPickaxe } from "../craftable-items/wooden-pickaxe";

export class Stone implements Item, Gatherable 
{
    public Name: string = "Stone";
    public Experience: number = 23;
    public Type: ItemType = ItemType.Material;
    public Description: string = "Its a rock...";
    public Value: number = 1;
    public IsRawMaterial: boolean = true;
    public LevelRequirement: number = 3;
    public RequiredTool: Tool | undefined = new WoodenPickaxe();
    public Rate: number = 6;
}