import { Craftable } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { Stone } from "../gatherable-items/stone";
import { Tool, ToolType } from "./tool";

export class StonePickaxe implements Item, Tool, Craftable {
    public Name: string = "Stone Pickaxe";
    public Experience: number = 78;
    public Type: ItemType = ItemType.Tool;
    public Description: string = "Stone pickaxe tool suited for mining";
    public Value: number = 6;
    public IsRawMaterial: boolean = false;
    public LevelRequirement: number = 5;
    public DamageAmount: number = 4.5;
    public ToolType: ToolType = ToolType.Mining;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new Stick(), 2),
        new RecipeItem(new Stone(), 1)
    ];
    public CraftTime: number = 20;
}