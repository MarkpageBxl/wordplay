import { GameEngine } from "../engine";
import { IScreen } from "../screen";

export class ResultScreen implements IScreen {
    engine: GameEngine;
    done: boolean = false

    constructor(engine: GameEngine) {
        this.engine = engine
    }

    init(): void {
    }

    updateState(): void {
    }

    repaint(): void {
        const context = this.engine.canvas.getContext("2d")!
        this.drawProgressBar(context)
        context.font = "5rem serif"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "black"
        context.fillText("Score: " + this.engine.state.score, this.engine.canvas.width / 2, this.engine.canvas.height / 2)
    }

    private drawProgressBar(context: CanvasRenderingContext2D): void {
        const barHeight = 100
        const barWidth = this.engine.canvas.width
        context.fillStyle = "red"
        context.fillRect(0, this.engine.canvas.height - barHeight, barWidth, barHeight)
    }

    isDone(): boolean {
        return this.done;
    }
}