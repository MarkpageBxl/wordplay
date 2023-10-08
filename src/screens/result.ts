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
    }

    tearDown(): void {
        window.removeEventListener("keydown", this.eventHandler)
        window.removeEventListener("pointerdown", this.eventHandler)
    }

    updateState(): void {
    }

    repaint(): void {
        const context = this.engine.canvas.getContext("2d")!
        const fontSize = Math.floor(96 * this.engine.canvas.height / 1080)
        const sep = Math.floor(96 * 3 * this.engine.canvas.height / 1080)
        context.font = `${fontSize}px serif`;
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "black"
        let x = this.engine.canvas.width / 2
        let y = this.engine.canvas.height / 2
        context.fillText(`Score : ${this.engine.state.wordIndex}`, x, y - sep)
        context.fillText(`Vitesse : ${this.engine.state.speed()} mots par minute`, x, y)
    }

    isDone(): boolean {
        return this.done;
    }
}
