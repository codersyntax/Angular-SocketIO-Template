export class LevelHandler {
    public CalculateLevel(xp: number) {
        return Math.floor(0.07 * Math.sqrt(xp));
    }
}