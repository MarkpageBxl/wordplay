export class GameState {
    words: string[] = []
    wordIndex: number = 0
    duration: number = 0

    public speed(): number {
        return Math.round(this.wordIndex / this.duration * 60)
    }
}