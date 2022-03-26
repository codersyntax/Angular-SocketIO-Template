import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { IronOre } from "../gatherable-items/iron-ore";

export class IronIngot implements Item, Craftable {
    public Name: string = "Iron Ingot";
    public Experience: number = 62;
    public ExperienceType: UseType = UseType.Smithing;
    public Type: ItemType = ItemType.Material;
    public UseType: UseType = UseType.None;
    public Description: string = "An iron ingot is essential ingredient for a variety of different tools and armor";
    public Value: number = 7;
    public LevelRequirement: number = 9;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new IronOre(), 2),
    ];
    public CraftTime: number = 12;
}