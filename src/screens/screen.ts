import { GameEngine } from "../engine"

export interface IScreen {
    engine: GameEngine

    init(): Promise<void>
    tearDown(): void
    updateState(): void
    repaint(): void
    isDone(): boolean
}
