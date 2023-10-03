export function shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randint(i)
        if (i !== j) {
            const tmp = array[i]
            array[i] = array[j]
            array[j] = tmp
        }
    }
}

function randint(max: number): number {
    return Math.floor(Math.random() * max);
}