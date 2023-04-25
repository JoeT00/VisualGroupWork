import Line from './Line';
/*
    Define the component Line for a single line
*/

function Lines({data,scale}){
    return (
        <g>
            {Object.keys(data).map(d=><Line key={d} data={data[d]} scale={scale} label={d} />)}
            {/*
                For each key of the data, render a single line using the Line component.
                Pass the label (key), the array of data, and scale to the Line component.
            */}
        </g>
    )
}

export default Lines;