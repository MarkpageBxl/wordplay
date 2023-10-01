import { GameEngine } from "../engine"
import { GameState } from "../state"

export interface IScreen {
    engine: GameEngine

    init(): void
    tearDown(): void
    updateState(): void
    repaint(): void
    isDone(): boolean
}
