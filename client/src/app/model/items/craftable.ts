import { Gatherable } from "./gatherable";

export abstract class Craftable {
    public Recipe!: Gatherable[];
    public LevelRequirement!: number;
  }