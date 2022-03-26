export class LevelHandler {
    public CalculateLevel(xp: number | undefined) {
        if(xp == undefined) return 0;
        return Math.floor((0.1 * Math.sqrt(xp) + 1));
    }
}