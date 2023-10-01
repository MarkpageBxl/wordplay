import { GameEngine } from "../engine";
import { IScreen } from "./screen";

export class MainScreen implements IScreen {
    engine: GameEngine
    duration: number
    startTimer: number = 0
    done: boolean = false
    elapsed: number = 0

    constructor(engine: GameEngine, duration: number) {
        this.engine = engine
        this.duration = duration * 1000
    }

    init(): void {
        this.startTimer = performance.now()
        this.elapsed = 0
        window.addEventListener("keydown", ev => this.onKeydown(ev))
        window.addEventListener("pointerdown", ev => this.onPointerdown(ev))
    }

    tearDown(): void {
        window.removeEventListener("keydown", ev => this.onKeydown(ev))
        window.removeEventListener("pointerdown", ev => this.onPointerdown(ev))
    }

    private onKeydown(ev: KeyboardEvent) {
        switch (ev.code) {
            case "Enter":
                this.engine.state.wordIndex++
        }
    }

    private onPointerdown(ev: PointerEvent) {
        this.engine.state.wordIndex++
    }

    updateState(): void {
        this.elapsed = (performance.now() - this.startTimer)
    }

    repaint(): void {
        const context = this.engine.canvas.getContext("2d")!;
        context.font = "5rem serif";
        context.textAlign = "center";
        context.textBaseline = "middle";

        if (this.elapsed < this.duration) {
            this.done = false;
            this.drawProgressBar(context)
        } else {
            this.done = true;
        }
    }

    private drawProgressBar(context: CanvasRenderingContext2D): void {
        const barHeight = 100
        const progress = (this.elapsed / this.duration)
        const barWidth = (1 - progress) * this.engine.canvas.width
        context.fillStyle = "red"
        context.fillRect(0, this.engine.canvas.height - barHeight, barWidth, barHeight)
    }

    isDone(): boolean {
        return this.done;
    }
}