import { CountdownScreen } from './countdown';
import { GameEngine } from './engine';


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const engine = new GameEngine()
engine.screens.push(new CountdownScreen(canvas))
engine.execute()