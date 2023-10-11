import { GameEngine } from "../engine"

export interface IScreen {
    init(): Promise<void>
    tearDown(): void
    updateState(): void
    repaint(): void
    isDone(): boolean
}
