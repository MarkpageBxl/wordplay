import { CountdownScreen } from "./screens/countdown";
import { MainScreen } from "./screens/main";
import { IScreen } from "./screen";
import { GameState } from "./state";
import { ResultScreen } from "./screens/result";

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
        screen = new MainScreen(this, 15)
        this.screens.push(screen)
        screen = new ResultScreen(this)
        this.screens.push(screen)
    }

    private step(time: DOMHighResTimeStamp): void {
        const screen = this.screens[this.currentScreenIndex]
        screen.updateState()
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        screen.repaint()
        if (screen.isDone()) {
            this.currentScreenIndex++
            if (this.currentScreenIndex >= this.screens.length) {
                console.log("Game engine stopping: no more screens to handle.")
                return;
            } else {
                console.debug("Initializing screen " + this.currentScreenIndex)
                this.screens[this.currentScreenIndex].init()
            }
        }
        window.requestAnimationFrame(time => this.step(time))
    }

    execute(): void {
        window.requestAnimationFrame(time => {
            console.debug("Initializing screen " + this.currentScreenIndex)
            this.screens[0].init()
            this.step(time)
        })
        console.log("Game engine running.")
    }
}
