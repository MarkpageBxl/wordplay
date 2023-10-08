import { GameEngine } from '../engine'
import { IScreen } from './screen'

export class CountdownScreen implements IScreen {
    engine: GameEngine
    duration: number
    startTimer: number = 0
    done: boolean = false
    elapsedSeconds: number = 0

    constructor(engine: GameEngine, duration: number) {
        this.engine = engine
        this.duration = duration
    }

    async init(): Promise<void> {
        this.startTimer = performance.now()
        this.elapsedSeconds = 0
    }

    tearDown(): void {
    }

    updateState(): void {
        this.elapsedSeconds = (performance.now() - this.startTimer) / 1000
    }

    repaint(): void {
        const valueDisplayed = Math.ceil(this.duration - this.elapsedSeconds)
        const context = this.engine.canvas.getContext("2d")!;
        const fontSize = Math.floor(96 * this.engine.canvas.height / 1080)
        context.font = `${fontSize}px serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";

        if (valueDisplayed >= 1) {
            this.done = false;
            context.fillText(valueDisplayed.toString(), this.engine.canvas.width / 2, this.engine.canvas.height / 2);
            context.strokeStyle = "red"
            context.lineWidth = Math.floor(30 * this.engine.canvas.height / 1080)
            const startAngle = ((this.duration - this.elapsedSeconds) % 1) * 2 * Math.PI
            const radius = Math.floor(150 * this.engine.canvas.height / 1080)
            context.arc(this.engine.canvas.width / 2, this.engine.canvas.height / 2, radius, startAngle, 0)
            context.stroke()
        } else {
            this.done = true;
        }
    }

    isDone(): boolean {
        return this.done;
    }
}
