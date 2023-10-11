import { GameEngine } from '../engine'
import { IScreen } from './screen'

export class CountdownScreen implements IScreen {
    durationSeconds: number
    startTimer: number = 0
    done: boolean = false
    elapsedSeconds: number = 0
    canvas!: HTMLCanvasElement
    counterSpan!: HTMLSpanElement

    constructor(durationSeconds: number) {
        this.durationSeconds = durationSeconds
    }

    async init(): Promise<void> {
        this.startTimer = performance.now()
        this.elapsedSeconds = 0
        const outerContainer = document.getElementById("outerContainer") as HTMLDivElement
        const counterDiv = document.createElement("div")
        counterDiv.id = "counter"
        this.counterSpan = document.createElement("span")
        this.canvas = document.createElement("canvas")
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.canvas.style.position = "absolute"
        counterDiv.appendChild(this.counterSpan)
        outerContainer.appendChild(counterDiv)
        outerContainer.appendChild(this.canvas)
    }

    tearDown(): void {
        const outerContainer = document.getElementById("outerContainer") as HTMLDivElement
        outerContainer.replaceChildren()
    }

    updateState(): void {
        this.elapsedSeconds = (performance.now() - this.startTimer) / 1000
    }

    async repaint() {
        const valueDisplayed = Math.ceil(this.durationSeconds - this.elapsedSeconds)
        this.counterSpan.innerText = valueDisplayed.toString()
        const context = this.canvas.getContext("2d")!;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (valueDisplayed >= 1) {
            this.done = false;
            context.strokeStyle = "red"
            context.lineWidth = 20
            let startAngle = ((this.durationSeconds - this.elapsedSeconds) % 1) * 2 * Math.PI
            let endAngle = 0
            const rotation = Math.PI / 2
            startAngle -= rotation
            endAngle -= rotation
            const radius = 120
            const x = this.canvas.width / 2
            const y = this.canvas.height / 2
            context.beginPath()
            context.arc(x, y, radius, startAngle, endAngle)
            context.stroke()
        } else {
            this.done = true;
        }
    }

    isDone(): boolean {
        return this.done;
    }
}
