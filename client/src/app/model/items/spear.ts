import { Craftable } from "./craftable";
import { Item, ItemType } from "./item";
import { RecipeItem } from "./recipe-item";
import { Stick } from "./stick";
import { Stone } from "./stone";
import { DamageType, Weapon, WeaponType } from "./weapon";

export class Spear implements Item, Craftable, Weapon
{
    public Name: string = "Spear";
    public Type: ItemType = ItemType.Weapon;
    public Description: string = "Its a spear...";
    public Value: number = 3;
    public IsRawMaterial: boolean = false;
    public LevelRequirement: number = 3;
    public DamageAmount: number = 4;
    public DamageType: DamageType = DamageType.Physical;
    public WeaponType: WeaponType = WeaponType.Melee;
    public Recipe: RecipeItem[] = [new RecipeItem(new Stone(), 1), new RecipeItem(new Stick(), 2)];
}