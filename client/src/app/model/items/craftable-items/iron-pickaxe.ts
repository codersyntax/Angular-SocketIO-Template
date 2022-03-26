import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { Tool, ToolType } from "./tool";
import { IronIngot } from "./iron-ingot";

export class IronPickaxe implements Item, Tool, Craftable {
    public Name: string = "Iron Pickaxe";
    public Experience: number = 125;
    public Type: ItemType = ItemType.Tool;
    public UseType: UseType = UseType.Mining;
    public Description: string = "Iron pickaxe tool better suited for mining";
    public Value: number = 18;
    public LevelRequirement: number = 12;
    public Multiplyer: number = 1.75;
    public ToolType: ToolType = ToolType.Mining;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new Stick(), 2),
        new RecipeItem(new IronIngot(), 1)
    ];
    public CraftTime: number = 40;
}