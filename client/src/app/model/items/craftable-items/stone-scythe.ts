import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { Tool, ToolType } from "./tool";
import { Stone } from "../gatherable-items/stone";

export class StoneScythe implements Item, Tool, Craftable {
    public Name: string = "Stone Scythe";
    public Experience: number = 82;
    public ExperienceType: UseType = UseType.Weaponsmithing;
    public Type: ItemType = ItemType.Tool;
    public UseType: UseType = UseType.Botany;
    public Description: string = "Useful tool for botany";
    public Value: number = 6;
    public LevelRequirement: number = 4;
    public Multiplyer: number = 1.25;
    public ToolType: ToolType = ToolType.Botany;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new Stick(), 2),
        new RecipeItem(new Stone(), 1)
    ];
    public CraftTime: number = 24;
}