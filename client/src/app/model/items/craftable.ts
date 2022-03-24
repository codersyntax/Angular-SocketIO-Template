import { ItemType } from "./item";
import { RecipeItem } from "./recipe-item";

export abstract class Craftable {
    public Name!: string;
    public Type!: ItemType;
    public LevelRequirement!: number;
    public Recipe!: RecipeItem[];
  }