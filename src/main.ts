const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext("2d");
if (context !== null) {
    context.fillStyle = "red";
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()
}