export class GameState {
    words: string[] = []
    wordIndex: number = 0
    maxDurationMs: number = 0
    actualDurationMs: number = 0

    constructor(maxSeconds: number) {
        this.maxDurationMs = maxSeconds * 1000
    }

    public speed(): number {
        if (this.actualDurationMs == 0) {
            this.actualDurationMs = this.maxDurationMs
        }
        return Math.round(this.wordIndex / this.actualDurationMs * 1000 * 60)
    }
}