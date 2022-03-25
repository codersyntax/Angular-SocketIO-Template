export class HealthHandler {
    public CalculateHealth(level: number | undefined) {
        if(level == undefined) return 0;
        return Math.floor(level * 24);
    }
}