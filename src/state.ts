export class GameState {
    words: string[] = []
    wordIndex: number = 0
    maxDuration: number = 0
    actualDuration: number = 0

    public speed(): number {
        if (this.actualDuration == 0) {
            this.actualDuration = this.maxDuration
        }
        return Math.round(this.wordIndex / this.actualDuration * 60)
    }
}