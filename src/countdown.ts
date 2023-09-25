export class Countdown {
    canvas: HTMLCanvasElement
    limit: number
    startTimer: number

    constructor(canvas: HTMLCanvasElement, limit: number = 5) {
        this.canvas = canvas
        this.limit = limit
        this.startTimer = 0
    }

    start(): void {
        this.startTimer = performance.now()
    }

    repaint(): boolean {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const context = this.canvas.getContext("2d")!;
        context.font = "8rem serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        const currentTimer = performance.now()
        const elapsed = (currentTimer - this.startTimer) / 1000
        const display = Math.ceil(this.limit - elapsed)

        if (display >= 1) {
            context.fillText(display.toString(), this.canvas.width / 2, this.canvas.height / 2);
            context.strokeStyle = "red"
            context.lineWidth = 15
            const startAngle = ((this.limit - elapsed) % 1) * 2 * Math.PI
            context.arc(this.canvas.width / 2, this.canvas.height / 2, 150, startAngle, 0)
            context.stroke()
            return true;
        }
        return false;
    }
}
