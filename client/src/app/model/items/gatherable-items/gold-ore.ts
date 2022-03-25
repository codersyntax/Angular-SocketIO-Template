import { Gatherable } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";

export class GoldOre implements Item, Gatherable 
{
    public Name: string = "Gold Ore";
    public Experience: number = 120;
    public Type: ItemType = ItemType.Material;
    public Description: string = "Its gold...";
    public Value: number = 10;
    public LevelRequirement: number = 10;
    public RequiredTool: Tool | undefined = undefined;
    public Rate: number = 16;
}