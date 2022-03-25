import { ItemType } from "../item";
import { Tool } from "../craftable-items/tool";

export abstract class Gatherable {
  public Name!: string;
  public Experience!: number;
  public Type!: ItemType;
  public RequiredTool!: Tool | undefined;
  public LevelRequirement!: number;
  public Description!: string;
  public Value!: number;
  public Rate!: number;
  }