export class LevelHandler {
    public CalculateLevel(xp: number) {
        return Math.floor(0.1 * Math.sqrt(xp));
    }
}