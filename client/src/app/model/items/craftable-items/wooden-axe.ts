import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { Tool, ToolType } from "./tool";

export class WoodenAxe implements Item, Tool, Craftable {
    public Name: string = "Wooden Axe";
    public Experience: number = 46;
    public ExperienceType: UseType = UseType.Weaponsmithing;
    public Type: ItemType = ItemType.Tool;
    public UseType: UseType = UseType.Botany;
    public Description: string = "Useful starter tool for botany";
    public Value: number = 3;
    public LevelRequirement: number = 2;
    public Multiplyer: number = 1;
    public ToolType: ToolType = ToolType.Botany;
    public Recipe: RecipeItem[] = [
        new RecipeItem(new Stick(), 3)
    ];
    public CraftTime: number = 12;
}