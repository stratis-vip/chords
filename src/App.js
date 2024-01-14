import { useEffect, useState } from 'react';
import { Utilities } from 'webmidi';
import GetMidi from './get-midi'
import Keyboard from './keyboard';
import { isBlack } from './utilities';
import isEqual from 'lodash.isequal';

const createEnum = (values) => {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

// { Up: 'Up', Down: 'Down', Left: 'Left', Right: 'Right' }
const chordType = createEnum(['MAJOR', 'MINOR', 'DIMINISHED', 'AUGMENTED', 'SEVENTH', 'MAJ7', 'SIXTH']);
const invertionType = createEnum(['NONE', 'FIRST', 'SECOND']);
const chords = [
  //MAJOR
  {
    combo: [0, 4, 7, 9],
    type: chordType.SIXTH,
    index: 0,
    invertion: 0,
    octave: 0
  },
  {
    combo: [0, 4, 7, 10],
    type: chordType.SEVENTH,
    index: 0,
    invertion: 0,
    octave: 0
  },
  {
    combo: [0, 4, 7, 11],
    type: chordType.MAJ7,
    index: 0,
    invertion: 0,
    octave: 0
  },
  {
    combo: [0, 4, 7, 12],
    type: chordType.MAJOR,
    index: 0,
    invertion: 0,
    octave: 0
  },
  {
    combo: [0, 6, 8],
    type: chordType.SEVENTH,
    index: 2,
    invertion: 1,
    octave: -1
  },
  {
    combo: [0, 3, 8, 12],
    type: chordType.MAJOR,
    index: 2,
    invertion: 1,
    octave: -1
  },
  {
    combo: [0, 5, 9, 12],
    type: chordType.MAJOR,
    index: 1,
    invertion: 2,
    octave: -1
  },
  //MINOR
  {
    combo: [0, 3, 7, 12],
    type: chordType.MINOR,
    index: 0,
    invertion: 0,
    octave: 0
  },
  {
    combo: [0, 4, 9, 12],
    type: chordType.MINOR,
    index: 2,
    invertion: 1,
    octave: -1
  },
  {
    combo: [0, 5, 8, 12],
    type: chordType.MINOR,
    index: 1,
    invertion: 2,
    octave: -1
  },

  //DIMIN
  {
    combo: [0, 3, 6, 12],
    type: chordType.DIMINISHED,
    index: 0,
    invertion: 0,
    octave: 0
  },
  {
    combo: [0, 3, 9, 12],
    type: chordType.DIMINISHED,
    index: 2,
    invertion: 1,
    octave: -1
  },
  {
    combo: [0, 6, 9, 12],
    type: chordType.DIMINISHED,
    index: 1,
    invertion: 2,
    octave: -1
  },
  //AUGMENT
  {
    combo: [0, 4, 8, 12],
    type: chordType.AUGMENTED,
    index: 0,
    invertion: 0,
    octave: 0
  },

]

function App() {
  const [notes, setNotes] = useState([])
  const [external, setExternal] = useState(undefined)

  useEffect(() => {
    if (notes.length > 0) { console.log(notes) }
  }, [notes])

  // const getChord = (ar) => {
  //   if (ar.length < 2) {
  //     return ""
  //   }
  //   if (ar.length === 3) {
  //     const arN = ar.map(m => Utilities.getNoteDetails(m).name)
  //     console.log(ar, ' => ', arN)
  //     //1. μετατροπή σε νότες με γράμμα
  //     //2. καθε νοτα θα μπει στη μέση
  //     //3. μετατροπή σε αριθμό
  //     // από δω και πέρα κανονικά
  //     //Πέμπτη καθαρή
  //     if (ar[2] - ar[0] === 7) {
  //       //Τριτη μεγαλη ΜΑτζορε
  //       if (ar[1] - ar[0] === 4) {
  //         console.log(Utilities.getNoteDetails(ar[0]))
  //         return `${Utilities.getNoteDetails(ar[0]).name}`
  //       }
  //       //Τριτη μικρή  Μινορε
  //       if (ar[1] - ar[0] === 3) {
  //         console.log(Utilities.getNoteDetails(ar[0]))
  //         return `${Utilities.getNoteDetails(ar[0]).name}m`
  //       }
  //     }

  //     //Πέμπτη ελλατωμένη
  //     if (ar[2] - ar[0] === 6) {

  //       //Τριτη μικρή  Ελλατωμένη
  //       if (ar[1] - ar[0] === 3) {
  //         console.log(Utilities.getNoteDetails(ar[0]))
  //         return `${Utilities.getNoteDetails(ar[0]).name}dim`
  //       }
  //     }

  //     //Πέμπτη αυξημένη
  //     if (ar[2] - ar[0] === 8) {

  //       //Τριτη μεγάλη 
  //       if (ar[1] - ar[0] === 4) {
  //         console.log(Utilities.getNoteDetails(ar[0]))
  //         return `${Utilities.getNoteDetails(ar[0]).name}aug`
  //       }
  //     }
  //   }
  //   return "No chord"
  // }

  const getChord = (ar) => {

    if (ar.length > 2) {
      if (ar.length === 4) {
        for (const chord of chords) {
          const chordToCheck = ar.map(b => b - ar[0])
          const isEQ = isEqual(chord.combo, chordToCheck)
          //  debugger
          if (isEQ) {
            return `${Utilities.toNoteIdentifier(ar[chord.index] + 12 * chord.octave)} - ${chord.type} inv:${chord.invertion}`
          }
        }
      } else {
        if (ar.length === 3) {
          for (const chord of chords) {
            const chordToCheck = ar.map(b => b - ar[0])
            const isEQ = isEqual(chord.combo.slice(0, 3), chordToCheck)
            //  debugger
            if (isEQ) {
              return `${Utilities.toNoteIdentifier(ar[chord.index] + 12 * chord.octave)} - ${chord.type} inv:${chord.invertion}`
            }
          }
        }
      }

    }
    return 'no chord'
  }

  return (
    <div >
      <GetMidi setExternal={setExternal} setNotes={setNotes} />
      <div>{external === undefined ? 'Δεν υπάρχει συνδεμένο midi interface' : `Συνδεμένο midi interface: ${external.name}`}</div>
      <Keyboard activeNotes={notes} />
      Notes
      {notes.sort().map((n, idx) => <div key={idx}> {n} {isBlack(n) ? ' black' : ' white'}</div>)}
      <div>{notes && getChord(notes)}</div>

    </div>
  );
}

export default App;


