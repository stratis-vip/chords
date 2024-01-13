import { useEffect } from 'react';
import { WebMidi, Utilities } from 'webmidi';

const GetMidi = ({ setNotes, setExternal }) => {
  // Function triggered when WEBMIDI.js is ready
  function onEnabled() {
    // Inputs
    console.log(WebMidi.inputs)
    // WebMidi.inputs.forEach(input => console.log(input, input.manufacturer, input.name));
    let myInput1
    if (WebMidi.inputs.length < 2) {
      myInput1 = WebMidi.inputs[0]
    } else {
      myInput1 = WebMidi.inputs[1]
    }
    // Outputsß
    myInput1.addListener("noteon", e => {
      console.log('ON', e, e.note.identifier);
      const nota = Utilities.toNoteNumber(e.note.identifier)

      setNotes(n => [...new Set([...n, nota])])

    })
    myInput1.addListener("noteoff", e => {
      console.log('OFF', e, e.note.identifier);
      const nota = Utilities.toNoteNumber(e.note.identifier)
      setNotes(n => n.filter(n => n !== nota))

    })
    setExternal(myInput1)

    // WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

  }
  useEffect(() => {
    WebMidi
      .enable()
      .then(onEnabled)
      .catch(err => alert(err));


  })
}

export default GetMidi