import * as d3 from 'd3';

function Line({ data, scale, label }) {
    /*
        *********************************************************************
        * Define the line using d3.line() for the single line.              *
        * Applying x scale and y scale completes the following code         *
        *   const path = d3.line()                                          *
        *       .x(...)                                                     *
        *       .y(...)                                                     *
        *       (data);                                                     *
        * *******************************************************************
    */
    return (
        <path />
        /*
            *****************************************************************************************
            * Define the line with the following attributes                                         *
            *   d = {path} - the path, which has been defined earlier                                *
            *   stroke = {...} - the color, which should be defined by the color scale and label    *
            *   fill = 'none' -  should explicitly specify no fill for the line                     *
            *   strokeWidth = '2' - you can customize the width of this line                        *
            *****************************************************************************************
        */
    )
}

export default Line;