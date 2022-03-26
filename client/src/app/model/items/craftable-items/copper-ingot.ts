import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { CopperOre } from "../gatherable-items/copper-ore";

export class CopperIngot implements Item, Craftable {
    public Name: string = "Copper Ingot";
    public Experience: number = 48;
    public Type: ItemType = ItemType.Material;
    public UseType: UseType = UseType.None;
    public Description: string = "Copper ingots is essential ingredient for a variety of different tools and armor";
    public Value: number = 5;
    public LevelRequirement: number = 6;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new CopperOre(), 2),
    ];
    public CraftTime: number = 9;
}