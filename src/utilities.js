export const GetNoteInfo = (noteNumber) => {
    const octave = Math.floor(noteNumber / 12) - 1
    const base = noteNumber % 12
    return { base: base, octave: octave, number: (octave + 1) * 12 + base }
}

export const isBlack = (noteNumber) => {
    const details = GetNoteInfo(noteNumber)
    const position = details.base
    if (position < 5) {
        return position % 2 !== 0
    } else {
        return position % 2 === 0
    }

}