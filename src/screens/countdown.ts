import { GameEngine } from '../engine'
import { IScreen } from './screen'
import { GameState } from '../state'

export class CountdownScreen implements IScreen {
    engine: GameEngine
    duration: number
    startTimer: number = 0
    done: boolean = false
    elapsed: number = 0

    constructor(engine: GameEngine, duration: number) {
        this.engine = engine
        this.duration = duration
    }

    init(): void {
        this.startTimer = performance.now()
        this.elapsed = 0
    }

    tearDown(): void {
    }

    updateState(): void {
        this.elapsed = (performance.now() - this.startTimer) / 1000
    }

    repaint(): void {
        const valueDisplayed = Math.ceil(this.duration - this.elapsed)
        const context = this.engine.canvas.getContext("2d")!;
        context.font = "5rem serif";
        context.textAlign = "center";
        context.textBaseline = "middle";

        if (valueDisplayed >= 1) {
            this.done = false;
            context.fillText(valueDisplayed.toString(), this.engine.canvas.width / 2, this.engine.canvas.height / 2);
            context.strokeStyle = "red"
            context.lineWidth = 15
            const startAngle = ((this.duration - this.elapsed) % 1) * 2 * Math.PI
            context.arc(this.engine.canvas.width / 2, this.engine.canvas.height / 2, 100, startAngle, 0)
            context.stroke()
        } else {
            this.done = true;
        }
    }

    isDone(): boolean {
        return this.done;
    }
}
