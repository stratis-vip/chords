
const Keyboard = () => {
    const keys = arrayRange(48,72,1)
    return <div className="h-32 font-extralight">
        Piano keyboard
        <div className="flex">

            {keys.map(note => <WhiteKey note={note} />)}
        </div>

    </div>
}


export default Keyboard

const WhiteKey = ({ note }) => {
    return (
        <div className="">
            <div className="flex items-center justify-center h-24 bg-white w-8 border mr-[1px]">{note}</div>
        </div>)
}

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );