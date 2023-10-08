import { CountdownScreen } from "./screens/countdown";
import { MainScreen } from "./screens/main";
import { IScreen } from "./screens/screen";
import { GameState } from "./state";
import { ResultScreen } from "./screens/result";

export class GameEngine {
    canvas: HTMLCanvasElement
    screens: IScreen[] = []
    currentScreenIndex: number = 0
    state: GameState

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.state = new GameState(15);
        let screen: IScreen = new CountdownScreen(this, 5)
        this.screens.push(screen)
        screen = new MainScreen(this)
        this.screens.push(screen)
        screen = new ResultScreen(this)
        this.screens.push(screen)
    }

    private async step(time: DOMHighResTimeStamp): Promise<void> {
        const screen = this.screens[this.currentScreenIndex]
        screen.updateState()
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        screen.repaint()
        if (screen.isDone()) {
            screen.tearDown()
            this.currentScreenIndex = (this.currentScreenIndex + 1) % this.screens.length
            if (this.currentScreenIndex >= this.screens.length) {
                console.log("Game engine stopping: no more screens to handle.")
                return;
            } else {
                console.debug("Initializing screen " + this.currentScreenIndex)
                await this.screens[this.currentScreenIndex].init()
            }
        }
        window.requestAnimationFrame(async time => await this.step(time))
    }

    execute(): void {
        window.requestAnimationFrame(async time => {
            console.debug("Initializing screen " + this.currentScreenIndex)
            await this.screens[0].init()
            await this.step(time)
        })
        console.log("Game engine running.")
    }
}
