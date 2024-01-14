import { isBlack } from "./utilities"
import './keyboard.css'
import { useEffect, useState } from "react"

const Keyboard = ({ activeNotes }) => {
    const keys = arrayRange(21, 108, 1)

    return <div className="h-32 font-extralight ">
        Piano keyboard
        {/* <div className="relative">
            <div className="flex">

                {keys.filter(n => !isBlack(n)).map(note => <WhiteKey key={note} note={note} />)}
            </div>
            <div className="absolute top-0 left-3" >
                <div className="flex">

                    {keys.filter(n => isBlack(n)).map(note => <BlackKey key={note} note={note} />)}
                </div>
            </div>
        </div> */}
        <div className="flex justify-center">
            <div id="piano-keyboard" className=" flex m-23">

                {keys.map(k => {
                    if (isBlack(k)) {
                        return <BlackKey key={k} note={k} activeNotes={activeNotes}/>
                    } else {
                        return <WhiteKey key={k} note={k} activeNotes={activeNotes} />
                    }
                })}


            </div>
        </div>
    </div>

}


export default Keyboard

const WhiteKey = ({ note, activeNotes }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (activeNotes.includes(note)) {
            setActive(true)
        } else {
            setActive(false)
        }

    }, [activeNotes, note])
    return (
        <div className={`key key-natural ${active ? 'active' : ''}`}></div>
    )
}

const BlackKey = ({ note, activeNotes }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (activeNotes.includes(note)) {
            setActive(true)
        } else {
            setActive(false)
        }

    }, [activeNotes, note])
    return (

        <div className={`key key-sharp  ${active ? 'active' : ''}`}></div>
    )
}
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );