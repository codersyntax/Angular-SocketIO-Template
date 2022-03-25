import { Inventory } from "../inventory/inventory";

export class Character {
    public Experience: number = 0;
    public Level: number = 1;
    public Currency: number = 0;
    public SocketId: string | undefined;
    public Inventory = new Inventory();

    constructor(public Name: string) 
    {}
  }