import { Countdown } from './countdown';


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const countdown = new Countdown(canvas)

function repaint(time: DOMHighResTimeStamp) {
    const shouldRepaint = countdown.repaint()
    if (shouldRepaint) {
        window.requestAnimationFrame(repaint)
    }
}

window.requestAnimationFrame(repaint)
