import {  useState } from 'react';
import {  Utilities } from 'webmidi';
import GetMidi from './get-midi'
import Keyboard from './keyboard';

function App() {
  const [notes, setNotes] = useState([])
  const [external, setExternal] = useState(undefined)

  const getChord = (ar) => {
    if (ar.length < 2) {
      return ""
    }
    if (ar.length === 3) {
      const arN = ar.map(m => Utilities.getNoteDetails(m).name)
      console.log(ar, ' => ', arN)
      //1. μετατροπή σε νότες με γράμμα
      //2. καθε νοτα θα μπει στη μέση
      //3. μετατροπή σε αριθμό
      // από δω και πέρα κανονικά
      //Πέμπτη καθαρή
      if (ar[2] - ar[0] === 7) {
        //Τριτη μεγαλη ΜΑτζορε
        if (ar[1] - ar[0] === 4) {
          console.log(Utilities.getNoteDetails(ar[0]))
          return `${Utilities.getNoteDetails(ar[0]).name}`
        }
        //Τριτη μικρή  Μινορε
        if (ar[1] - ar[0] === 3) {
          console.log(Utilities.getNoteDetails(ar[0]))
          return `${Utilities.getNoteDetails(ar[0]).name}m`
        }
      }

      //Πέμπτη ελλατωμένη
      if (ar[2] - ar[0] === 6) {

        //Τριτη μικρή  Ελλατωμένη
        if (ar[1] - ar[0] === 3) {
          console.log(Utilities.getNoteDetails(ar[0]))
          return `${Utilities.getNoteDetails(ar[0]).name}dim`
        }
      }

      //Πέμπτη αυξημένη
      if (ar[2] - ar[0] === 8) {

        //Τριτη μεγάλη 
        if (ar[1] - ar[0] === 4) {
          console.log(Utilities.getNoteDetails(ar[0]))
          return `${Utilities.getNoteDetails(ar[0]).name}aug`
        }
      }
    }
    return "No chord"
  }

  return (
    <div >
      <GetMidi setExternal={setExternal} setNotes={setNotes} />
      <div>{external === undefined ? 'Δεν υπάρχει συνδεμένο midi interface' : `Συνδεμένο midi interface: ${external.name}` }</div>
      <Keyboard />
      Notes
      {notes.sort().map((n, idx) => <div key={idx}> {n}</div>)}
      <div>{notes && getChord(notes)}</div>

    </div>
  );
}

export default App;


