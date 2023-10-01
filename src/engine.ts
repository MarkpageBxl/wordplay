import { IScreen } from "./screen";

export class GameEngine {
    screens: IScreen[] = []
    currentScreenIndex: number = 0

    private step(time: DOMHighResTimeStamp): void {
        const screen = this.screens[this.currentScreenIndex]
        screen.updateState()
        screen.repaint()
        if (screen.isDone()) {
            this.currentScreenIndex++
            if (this.currentScreenIndex >= this.screens.length) {
                console.log("Game engine exiting, no more screens to handle.")
                return;
            }
        }
        window.requestAnimationFrame(time => this.step(time))
    }

    execute(): void {
        window.requestAnimationFrame(time => this.step(time))
    }
}