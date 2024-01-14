import { useEffect, useState } from 'react';
import { WebMidi, Utilities } from 'webmidi';
import { GetNoteInfo, isBlack } from './utilities'

const GetMidi = ({ setNotes, setExternal }) => {
  const [local, setLocal] = useState(null)

  useEffect(() => {
    if (local !== null) {
      const myInput = local
      myInput.addListener("noteon", e => {
        // console.log('ON', e, e.note.identifier);
        console.log(GetNoteInfo(e.data[1]), isBlack(e.data[1]) ? "BLACK" : "WHITE")
        const nota = Utilities.toNoteNumber(e.note.identifier)

        setNotes(n => [...new Set([...n, nota])])

      })
      myInput.addListener("noteoff", e => {
        // console.log('OFF', e, e.note.identifier);
        const nota = Utilities.toNoteNumber(e.note.identifier)
        setNotes(n => n.filter(n => n !== nota))
      })

      setExternal(myInput)
      return () => {
        myInput.removeListener("noteon", () => {
          console.log('noteon listener removed')
        })
        myInput.removeListener("noteoff", () => {
          console.log('noteoff listener removed')
        })

      }
    }
  }, [local])

  // Function triggered when WEBMIDI.js is ready
  function onEnabled() {
    if (WebMidi.inputs.length === 0) { return }
    if (WebMidi.inputs.length === 1) {
      setLocal(WebMidi.inputs[0])
    } else {
      //TODO add a option box to select midi
    }

  }

  useEffect(() => {
    WebMidi
      .enable()
      .then(onEnabled)
      .catch(err => alert(err));
  })
}

export default GetMidi

