import { Inventory } from "./inventory/inventory";

export class Character {
    public Level: number = 1;
    public Currency: number = 0;
    public SocketId: string | undefined;
    public Inventory = new Inventory();
    public saveString: string = JSON.stringify(this);

    constructor(public Name: string) 
    {}
  }