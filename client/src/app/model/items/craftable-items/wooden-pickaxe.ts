import { Craftable } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { Tool, ToolType } from "./tool";

export class WoodenPickaxe implements Item, Tool, Craftable {
    public Name: string = "Wooden Pickaxe";
    public Experience: number = 42;
    public Type: ItemType = ItemType.Tool;
    public Description: string = "Useful starter tool for mining";
    public Value: number = 3;
    public IsRawMaterial: boolean = false;
    public LevelRequirement: number = 2;
    public DamageAmount: number = 3;
    public ToolType: ToolType = ToolType.Mining;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new Stick(), 3)
    ];
    public CraftTime: number = 10;
}