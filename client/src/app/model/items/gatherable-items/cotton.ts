import { Gatherable, GatherType } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";
import { WoodenScythe } from "../craftable-items/wooden-scythe";

export class Cotton implements Item, Gatherable 
{
    public Name: string = "Cotton";
    public Experience: number = 48;
    public Type: ItemType = ItemType.Material;
    public GatherType: GatherType = GatherType.Botany;
    public Description: string = "Cotton is used to process into fabrics";
    public Value: number = 4;
    public RequiredTool: Tool | undefined = new WoodenScythe;
    public LevelRequirement: number = 5;
    public Rate: number = 8;
}