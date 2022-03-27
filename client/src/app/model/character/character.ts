import { Inventory } from "../inventory/inventory";
import { Skills } from "./skills";

export class Character {
    public Experience: number = 0;
    public Level: number = 1;
    public Skills: Skills = new Skills;
    public Currency: number = 1000;
    public SocketId: string | undefined;
    public Inventory = new Inventory();

    constructor(public Name: string) 
    {}
  }