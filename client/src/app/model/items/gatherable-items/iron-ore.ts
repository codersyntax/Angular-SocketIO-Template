import { Gatherable, GatherType } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";
import { CopperPickaxe } from "../craftable-items/copper-pickaxe";

export class IronOre implements Item, Gatherable 
{
    public Name: string = "Iron Ore";
    public Experience: number = 52;
    public Type: ItemType = ItemType.Material;
    public GatherType: GatherType = GatherType.Mining;
    public Description: string = "A natural metallic sediment that can be mined, smelted, or sold for profit";
    public Value: number = 5;
    public LevelRequirement: number = 9;
    public RequiredTool: Tool | undefined = new CopperPickaxe();
    public Rate: number = 15;
}