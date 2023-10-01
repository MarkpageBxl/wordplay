import { CountdownScreen } from "./countdown";
import { IScreen } from "./screen";
import { GameState } from "./state";

export class GameEngine {
    canvas: HTMLCanvasElement
    screens: IScreen[] = []
    currentScreenIndex: number = 0
    state: GameState

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.state = new GameState();
        let screen: IScreen = new CountdownScreen(this, 5)
        this.screens.push(screen)
    }

    private step(time: DOMHighResTimeStamp): void {
        const screen = this.screens[this.currentScreenIndex]
        screen.updateState()
        screen.repaint()
        if (screen.isDone()) {
            this.currentScreenIndex++
            if (this.currentScreenIndex >= this.screens.length) {
                console.log("Game engine stopping: no more screens to handle.")
                return;
            }
        }
        window.requestAnimationFrame(time => this.step(time))
    }

    execute(): void {
        window.requestAnimationFrame(time => this.step(time))
        console.log("Game engine running.")
    }
}
