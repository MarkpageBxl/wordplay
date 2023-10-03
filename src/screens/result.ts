import { GameEngine } from "../engine";
import { IScreen } from "./screen";

export class ResultScreen implements IScreen {
    engine: GameEngine;
    done: boolean = false

    constructor(engine: GameEngine) {
        this.engine = engine
    }

    async init(): Promise<void> {
        this.done = false
        setTimeout(() => {
            window.addEventListener("keydown", ev => this.onKeydown(ev))
            window.addEventListener("pointerdown", ev => this.onPointerdown(ev))
        }, 1000)
    }

    private onKeydown(ev: KeyboardEvent) {
        switch (ev.code) {
            case "Enter":
            case "Space":
            case "ArrowRight":
                this.done = true
        }
    }

    private onPointerdown(ev: PointerEvent) {
        this.done = true
    }

    tearDown(): void {
        window.removeEventListener("keydown", ev => this.onKeydown(ev))
        window.removeEventListener("pointerdown", ev => this.onPointerdown(ev))
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
