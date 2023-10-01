import { GameEngine } from './engine';

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const engine = new GameEngine(canvas)
engine.execute()
