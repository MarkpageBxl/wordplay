import { GameEngine } from "../engine";
import { IScreen } from "./screen";

class ResultScreenEventHandler implements EventListenerObject {
    private owner: ResultScreen;

    constructor(owner: ResultScreen) {
        this.owner = owner;
    }

    handleEvent(event: Event): void {
        if (event instanceof KeyboardEvent) {
            switch (event.code) {
                case "Enter":
                case "Space":
                case "ArrowRight":
                    this.owner.done = true
            }
        }
        else if (event instanceof PointerEvent) {
            this.owner.done = true
        }
    }
}

export class ResultScreen implements IScreen {
    engine: GameEngine;
    done: boolean = false
    eventHandler: EventListenerObject
    scoreLine?: HTMLDivElement
    speedLine?: HTMLDivElement

    constructor(engine: GameEngine) {
        this.engine = engine
        this.eventHandler = new ResultScreenEventHandler(this)
    }

    async init(): Promise<void> {
        this.done = false
        setTimeout(() => {
            window.addEventListener("keydown", this.eventHandler)
            window.addEventListener("pointerdown", this.eventHandler)
        }, 1000)
        const outerContainer = document.getElementById("outerContainer") as HTMLDivElement
        outerContainer.replaceChildren()
        const innerContainer = document.createElement("div") as HTMLDivElement
        innerContainer.id = "innerContainer"
        outerContainer.appendChild(innerContainer)
        this.scoreLine = document.createElement("div")
        this.scoreLine.id = "scoreLine"
        this.speedLine = document.createElement("div")
        this.speedLine.id = "speedLine"
        innerContainer.appendChild(this.scoreLine)
        innerContainer.appendChild(this.speedLine)
    }

    tearDown(): void {
        window.removeEventListener("keydown", this.eventHandler)
        window.removeEventListener("pointerdown", this.eventHandler)
        this.engine.state.actualDurationMs = 0
        const outerContainer = document.getElementById("outerContainer") as HTMLDivElement
        outerContainer.replaceChildren()
    }

    updateState(): void {
    }

    repaint(): void {
        this.scoreLine!.innerHTML = `${this.engine.state.wordIndex} mots lus`
        this.speedLine!.innerHTML = `${this.engine.state.speed()} mots/min`
    }

    isDone(): boolean {
        return this.done;
    }
}
