import { Gatherable, GatherType } from "./gatherable";
import { Item, ItemType } from "../item";
import { Tool } from "../craftable-items/tool";

export class Stick implements Item, Gatherable 
{
    public Name: string = "Stick";
    public Experience: number = 10;
    public Type: ItemType = ItemType.Material;
    public GatherType: GatherType = GatherType.Botany;
    public Description: string = "Its a stick...";
    public Value: number = 1;
    public RequiredTool: Tool | undefined = undefined;
    public LevelRequirement: number = 1;
    public Rate: number = 3;
}