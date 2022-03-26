import { Gatherable, GatherType } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";
import { WoodenScythe } from "../craftable-items/wooden-scythe";

export class Wheat implements Item, Gatherable 
{
    public Name: string = "Wheat";
    public Experience: number = 16;
    public Type: ItemType = ItemType.Material;
    public GatherType: GatherType = GatherType.Botany;
    public Description: string = "Wheat is used to process into breads";
    public Value: number = 2;
    public RequiredTool: Tool | undefined = new WoodenScythe();
    public LevelRequirement: number = 3;
    public Rate: number = 4;
}