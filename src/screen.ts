export interface IScreen {
    canvas: HTMLCanvasElement

    init(): void
    updateState(): void
    repaint(): void
    isDone(): boolean
}