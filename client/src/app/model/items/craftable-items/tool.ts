export abstract class Tool {
    public Name!: string;
    public LevelRequirement!: number;
    public Multiplyer!: number;
    public ToolType!: ToolType;
  }
  
  export enum ToolType {
    Mining,
    Botany
  }