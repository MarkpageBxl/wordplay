import { GameEngine } from "../engine";
import { shuffle } from "../utils";
import { IScreen } from "./screen";

export class MainScreen implements IScreen {
    engine: GameEngine
    duration: number
    startTimer: number = 0
    done: boolean = false
    elapsed: number = 0
    words: string[] = []

    constructor(engine: GameEngine, duration: number) {
        this.engine = engine
        this.duration = duration * 1000
    }

    async init(): Promise<void> {
        if (this.words.length == 0) {
            const response = await fetch('words.json')
            this.words = await response.json()
        }
        shuffle(this.words)
        this.engine.state.wordIndex = 0
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
            case "Space":
            case "ArrowRight":
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
        this.drawWord(context)
        if (this.elapsed < this.duration) {
            this.done = false;
            this.drawProgressBar(context)
        } else {
            this.done = true;
        }
    }

    private currentWord(): string {
        return this.words[this.engine.state.wordIndex]
    }

    private drawWord(context: CanvasRenderingContext2D): void {
        const fontSize = Math.floor(96 * this.engine.canvas.height / 1080)
        context.font = `${fontSize}px serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "black";
        context.fillText(this.currentWord(), this.engine.canvas.width / 2, this.engine.canvas.height / 2)
    }

    private drawProgressBar(context: CanvasRenderingContext2D): void {
        const barHeight = Math.floor(150 * this.engine.canvas.height / 1080)
        const progress = (this.elapsed / this.duration)
        const barWidth = (1 - progress) * this.engine.canvas.width
        context.fillStyle = "red"
        context.fillRect(0, this.engine.canvas.height - barHeight, barWidth, barHeight)
    }

    isDone(): boolean {
        return this.done;
    }
}
