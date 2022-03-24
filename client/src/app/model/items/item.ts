export abstract class Item {
    public Name!: string;
    public Type!: ItemType;
    public Description!: string;
    public Value!: number;
    public IsRawMaterial!: boolean;
    public LevelRequirement!: number;
}

export enum ItemType {
    Material,
    Consumable,
    Weapon,
    Armor
}