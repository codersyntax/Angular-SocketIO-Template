import { ItemType } from "./item";

export abstract class Gatherable {
  public Name!: string;
  public Experience!: number;
  public Type!: ItemType;
  public LevelRequirement!: number;
  public Description!: string;
  public Value!: number;
  public IsRawMaterial!: boolean;
  public Rate!: number;
  }