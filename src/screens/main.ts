import { GameEngine } from "../engine";
import { shuffle } from "../utils";
import { IScreen } from "./screen";

class MainScreenEventHandler implements EventListenerObject {
    private owner: MainScreen

    constructor(owner: MainScreen) {
        this.owner = owner
    }

    handleEvent(event: Event): void {
        if (event.type === "keydown") {
            var keyboardEvent = event as KeyboardEvent
            switch (keyboardEvent.code) {
                case "Enter":
                case "Space":
                case "ArrowRight":
                    this.owner.engine.state.wordIndex++
                    break
                case "Escape":
                    this.owner.abort()
                    break
            }
        }
        else if (event.type === "pointerdown") {
            this.owner.engine.state.wordIndex++
        }
    }
}

export class MainScreen implements IScreen {
    engine: GameEngine
    startTimer: number = 0
    done: boolean = false
    elapsedMs: number = 0
    words: string[] = []
    eventHandler: MainScreenEventHandler

    constructor(engine: GameEngine) {
        this.engine = engine
        this.eventHandler = new MainScreenEventHandler(this);
    }

    async init(): Promise<void> {
        if (this.words.length == 0) {
            const response = await fetch('words.json')
            this.words = await response.json()
        }
        shuffle(this.words)
        this.engine.state.wordIndex = 0
        this.startTimer = performance.now()
        this.elapsedMs = 0
        this.done = false
        window.addEventListener("keydown", this.eventHandler);
        window.addEventListener("pointerdown", this.eventHandler)
    }

    tearDown(): void {
        window.removeEventListener("keydown", this.eventHandler);
        window.removeEventListener("pointerdown", this.eventHandler)
    }

    updateState(): void {
        this.elapsedMs = (performance.now() - this.startTimer)
    }

    repaint(): void {
        if (this.done)
            return;
        const context = this.engine.canvas.getContext("2d")!;
        this.drawWord(context)
        if (this.elapsedMs < this.engine.state.maxDurationMs) {
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
        const progress = (this.elapsedMs / this.engine.state.maxDurationMs)
        const barWidth = (1 - progress) * this.engine.canvas.width
        context.fillStyle = "red"
        context.fillRect(0, this.engine.canvas.height - barHeight, barWidth, barHeight)
    }

    isDone(): boolean {
        return this.done
    }

    abort(): void {
        this.done = true
        this.engine.state.actualDurationMs = this.elapsedMs
    }
}
