import { ItemType } from "../item";
import { RecipeItem } from "./recipe-item";

export abstract class Craftable {
    public Name!: string;
    public Experience!: number;
    public ExperienceType!: UseType;
    public Type!: ItemType;
    public UseType!: UseType;
    public LevelRequirement!: number;
    public Description!: string;
    public Value!: number;
    public Recipe!: RecipeItem[];
    public CraftTime!: number;
  }

export enum UseType {
  Mining,
  Botany,
  Farming,
  Fishing,
  Alchemy,
  MagicalCombat,
  PhysicalCombat,
  Cooking,
  Smithing,
  Weaponsmithing,
  Armorer,
  Weaver,
  Goldsmithing,
  None
}