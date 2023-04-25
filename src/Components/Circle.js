function Circle({ data, scale, label, hover }) {
    return (
        <g>
            {data.map((d, i) => <circle key={i} />)}
            {/*
                *************************************************************************************************************************************************
                * data is the array for a specific key.                                                                                                         *
                * Create a circle for each item in this array.                                                                                                  *
                * Define the circle with the following attributes                                                                                               *
                *   cx = {...} - the x position of the circle, defined by the x scale and the index i                                                           *
                *   cy = {...} - the y position of the circle, defined by the y scale and the value d                                                           *
                *   r = '6' -  the radius, here I manually set it to 6 (it's not good but make it simpler)                                                     *
                *   fill = {...} - the filled color, defined by the color scale and the label                                                                   *
                * Define the mouse hovering listener                                                                                                            *
                *   onMouseOver = {hover(i)} - when hovering on a circle, call the Hover method (defined in App.js) by passing the index                        *                  
                *   onMouseOut = {hover(-1)} - when mouse leave this circle, call the Hover method by passing -1 (which means no circle is under hovering)      *
                *************************************************************************************************************************************************
            */}
            
        </g>
    )
}

export default Circle;