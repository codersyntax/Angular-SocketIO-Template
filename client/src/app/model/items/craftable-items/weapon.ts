export abstract class Weapon {
  public Name!: string;
  public LevelRequirement!: number;
  public DamageAmount!: number;
  public DamageType!: DamageType;
  public WeaponType!: WeaponType;
}

export enum WeaponType {
  Melee,
  Ranged
}

export enum DamageType {
  Physical,
  Poison,
  Fire
}