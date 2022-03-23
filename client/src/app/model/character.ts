import { Socket } from "ngx-socket-io";

export class Character {
    public Level: number = 1;
    public Currency: number = 0;
    public SocketId: string | undefined;

    constructor(public Name: string) 
    {

    }

    GenerateSaveString(): string {
        return JSON.stringify(this);
    }
  }