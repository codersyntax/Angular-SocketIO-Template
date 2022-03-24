import { Weapon } from "../items/weapon";

export class ArmoryItem {
    public Weapon!: Weapon;
    public Count: number = 0;

    constructor(weapon: Weapon) {
        this.Weapon = weapon;
    }
}