import { ItemType } from "../item";
import { RecipeItem } from "./recipe-item";

export abstract class Craftable {
    public Name!: string;
    public Experience!: number;
    public Type!: ItemType;
    public LevelRequirement!: number;
    public Description!: string;
    public Value!: number;
    public Recipe!: RecipeItem[];
    public CraftTime!: number;
  }