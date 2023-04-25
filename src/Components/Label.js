import Item from "./Item";
/*
    Define the component Item for a single legend of a key
*/

function Label({ data, scale,current }) {
    const h=15;
    /*
        Manually define the height step for every single item.
        It's not good.
    */
    return (
        <g transform={`translate(${scale.x.range()[0]*1.1},${scale.y.range()[1]})`}> {/* positioned the legend at the upper left corner within the coordinates */}
            <rect width='72' height={h*Object.keys(data).length} fill='none' stroke='black'/>
            {/*
                Render a frame for the legend panel.
                Manually set the size of the rect, which is not good but simplify the code for the homwwork.
            */}
            {Object.keys(data).map((d,i)=><Item key={d} label={d} value={current<0?'':data[d][current]} position={h*i} color={scale.c(d)} />)}
            {/*
                For each key of the data, render a legend item using the Item component.
                Pass the label (key), the value of hovering circle (if no circle is hovered, pass a empty string), the y position, and the color to the Item component.
            */}
        </g>
    )
}

export default Label;