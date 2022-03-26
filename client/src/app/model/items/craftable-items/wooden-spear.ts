import { Craftable, UseType } from "./craftable";
import { Item, ItemType } from "../item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "../gatherable-items/stick";
import { DamageType, Weapon, WeaponType } from "./weapon";

export class WoodenSpear implements Item, Craftable, Weapon
{
    public Name: string = "Wooden Spear";
    public Experience: number = 58;
    public ExperienceType: number = UseType.Weaponsmithing;
    public Type: ItemType = ItemType.Weapon;
    public UseType: UseType = UseType.PhysicalCombat;
    public Description: string = "Its a wooden spear...";
    public Value: number = 3;
    public LevelRequirement: number = 3;
    public DamageAmount: number = 4;
    public DamageType: DamageType = DamageType.Physical;
    public WeaponType: WeaponType = WeaponType.Melee;
    public Recipe: RecipeItem[] = [new RecipeItem(new Stick(), 4)];
    public CraftTime: number = 15;
}