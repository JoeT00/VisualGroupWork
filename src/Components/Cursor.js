function Cursor({ yrange, position }) {
    return (
        <line x1={position} x2={position} y1={yrange[0]} y2={yrange[1]} stroke='black' strokeWidth='2' />
    )
}

export default Cursor;