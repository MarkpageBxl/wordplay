import { IScreen } from './screen'

export class CountdownScreen implements IScreen {
    canvas: HTMLCanvasElement
    limit: number
    startTimer: number = 0
    done: boolean = false
    elapsed: number = 0

    constructor(canvas: HTMLCanvasElement, limit: number = 5) {
        this.canvas = canvas
        this.limit = limit
    }

    init(): void {
        this.startTimer = performance.now()
        this.elapsed = 0
    }

    updateState(): void {
        this.elapsed = (performance.now() - this.startTimer) / 1000
    }

    repaint(): void {
        this.updateState()
        const context = this.canvas.getContext("2d")!;
        context.font = "8rem serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        const valueDisplayed = Math.ceil(this.limit - this.elapsed)
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        if (valueDisplayed >= 1) {
            this.done = false;
            context.fillText(valueDisplayed.toString(), this.canvas.width / 2, this.canvas.height / 2);
            context.strokeStyle = "red"
            context.lineWidth = 15
            const startAngle = ((this.limit - this.elapsed) % 1) * 2 * Math.PI
            context.arc(this.canvas.width / 2, this.canvas.height / 2, 100, startAngle, 0)
            context.stroke()
        } else {
            this.done = true;
        }
    }

    isDone(): boolean {
        return this.done;
    }
}
