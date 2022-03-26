import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { CopperIngot } from "../craftable-items/copper-ingot";
import { Tool, ToolType } from "./tool";

export class CopperPickaxe implements Item, Tool, Craftable {
    public Name: string = "Copper Pickaxe";
    public Experience: number = 98;
    public Type: ItemType = ItemType.Tool;
    public UseType: UseType = UseType.Mining;
    public Description: string = "Copper pickaxe tool better suited for mining";
    public Value: number = 12;
    public LevelRequirement: number = 8;
    public Multiplyer: number = 1.5;
    public ToolType: ToolType = ToolType.Mining;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new Stick(), 2),
        new RecipeItem(new CopperIngot(), 1)
    ];
    public CraftTime: number = 30;
}