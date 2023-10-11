import { GameEngine } from "../engine";
import { shuffle } from "../utils";
import { IScreen } from "./screen";

class MainScreenEventHandler implements EventListenerObject {
    private owner: MainScreen

    constructor(owner: MainScreen) {
        this.owner = owner
    }

    handleEvent(event: Event): void {
        if (event instanceof KeyboardEvent) {
            switch (event.code) {
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
        else if (event instanceof PointerEvent) {
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
    wordElement!: HTMLDivElement
    progressBarCanvas?: HTMLCanvasElement

    constructor(engine: GameEngine) {
        this.engine = engine
        this.eventHandler = new MainScreenEventHandler(this);
    }

    async init(): Promise<void> {
        let words = new Promise<string[]>(resolve => resolve(this.words))
        if (this.words.length == 0) {
            words = fetch('words.json').then(response => response.json())
        }
        this.engine.state.wordIndex = 0
        this.startTimer = performance.now()
        this.elapsedMs = 0
        this.done = false
        window.addEventListener("keydown", this.eventHandler)
        window.addEventListener("pointerdown", this.eventHandler)

        const outerContainer = document.getElementById("outerContainer") as HTMLDivElement
        outerContainer.replaceChildren()

        const innerContainer = document.createElement("div") as HTMLDivElement
        innerContainer.id = "innerContainer"
        outerContainer.appendChild(innerContainer)
        this.wordElement = document.createElement("div")
        this.wordElement.id = "word"
        innerContainer.appendChild(this.wordElement)

        const progressBarContainer = document.createElement("div")
        progressBarContainer.id = "progressBarContainer"
        this.progressBarCanvas = document.createElement("canvas")
        progressBarContainer.appendChild(this.progressBarCanvas)
        outerContainer.appendChild(progressBarContainer)

        this.words = await words
        shuffle(this.words)
    }

    tearDown(): void {
        window.removeEventListener("keydown", this.eventHandler)
        window.removeEventListener("pointerdown", this.eventHandler)
        const outerContainer = document.getElementById("outerContainer") as HTMLDivElement
        outerContainer.replaceChildren()
        this.progressBarCanvas = undefined
    }

    updateState(): void {
        this.elapsedMs = (performance.now() - this.startTimer)
    }

    repaint(): void {
        if (this.done)
            return;
        this.progressBarCanvas!.width = this.progressBarCanvas!.parentElement!.offsetWidth;
        this.progressBarCanvas!.height = this.progressBarCanvas!.parentElement!.offsetHeight;
        this.wordElement.innerHTML = this.currentWord();
        if (this.elapsedMs < this.engine.state.maxDurationMs) {
            this.drawProgressBar()
        } else {
            this.done = true;
        }
    }

    private currentWord(): string {
        return this.words[this.engine.state.wordIndex]
    }

    private drawProgressBar(): void {
        const context = this.progressBarCanvas!.getContext("2d")!;
        const barHeight = this.progressBarCanvas!.height
        const progress = (this.elapsedMs / this.engine.state.maxDurationMs)
        const barWidth = (1 - progress) * this.progressBarCanvas!.width
        context.fillStyle = "red"
        context.fillRect(0, this.progressBarCanvas!.height - barHeight, barWidth, barHeight)
    }

    isDone(): boolean {
        return this.done
    }

    abort(): void {
        this.done = true
        this.engine.state.actualDurationMs = this.elapsedMs
    }
}
