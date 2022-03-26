import { Gatherable, GatherType } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";
import { IronPickaxe } from "../craftable-items/iron-pickaxe";

export class GoldOre implements Item, Gatherable 
{
    public Name: string = "Gold Ore";
    public Experience: number = 120;
    public Type: ItemType = ItemType.Material;
    public GatherType: GatherType = GatherType.Mining;
    public Description: string = "Its gold...";
    public Value: number = 10;
    public LevelRequirement: number = 14;
    public RequiredTool: Tool | undefined = new IronPickaxe();
    public Rate: number = 16;
}