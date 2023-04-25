import Circle from './Circle';
/*
    Define the component Circle for a set of circles of a key
*/

function Points({ data, scale, hover }) {
    return (
        <g>
            {Object.keys(data).map(d => <Circle key={d} data={data[d]} scale={scale} label={d} hover={hover} />)}
            {/*
                For each key of the data, render a set of circles using the Circle component.
                Pass the label (key) to define the color, the array of data, and scale to the Circle component.
            */}
        </g>
    )
}

export default Points;