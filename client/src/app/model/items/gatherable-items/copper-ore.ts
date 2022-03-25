import { Gatherable } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";
import { StonePickaxe } from "../craftable-items/stone-pickaxe";

export class CopperOre implements Item, Gatherable 
{
    public Name: string = "Copper Ore";
    public Experience: number = 36;
    public Type: ItemType = ItemType.Material;
    public Description: string = "A natural metallic sediment that can be mined, smelted, or sold for profit";
    public Value: number = 3;
    public LevelRequirement: number = 6;
    public RequiredTool: Tool | undefined = new StonePickaxe();
    public Rate: number = 9;
}