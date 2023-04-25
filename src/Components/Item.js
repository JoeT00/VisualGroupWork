function Item({ label, value, position, color }) {
    /*
        This component render a single legend item
    */
    return (
        <g transform={`translate(1,${position})`} fill={color}> {/* Define the y position of this item, and color */}
            <text alignmentBaseline='hanging' fontWeight='bold'>{label + ':'}</text>
            <text dx='18' alignmentBaseline='hanging' >{value ? value.toFixed(4) : value}</text>
            {/*
                Show the label in respective color.
                If a circle is hovered, show the values for all keys at the same index (a cursor will mark them).
                Keep four decimal places of the value.
            */}
        </g>
    )
}

export default Item;