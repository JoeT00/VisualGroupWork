import { useState, useEffect, useRef } from 'react';
/*
    We must have this line to load HOOK
*/
import * as d3 from 'd3';
import './App.css';

import Lines from './Components/Lines';
import Points from './Components/Points';
import Label from './Components/Label';
import Cursor from './Components/Cursor';
/*
    All customized components are defined in the Components folder
*/

function App() {
    const GenData = () => ['A', 'B', 'C', 'D', 'E'].reduce((arr, crr) => ({ ...arr, [crr]: d3.range(10).map(d => Math.random()).sort() }), {});
    /* 
        GenData is a private function to generate a random data with format:
        {
            A: [10 random number],
            B: [10 random number],
            C: [10 random number],
            D: [10 random number],
            E: [10 random number],
        }
    */
    const Hover = i => () => setId(i);
    /*
        Hover is method to respond the mouse hovering on circles
    */

    const [objData, setData] = useState(GenData);
    /*
        Initialize data.
        THINKING: If we want to update the data during the application (with out refresh the page), what should we do?
    */
    const [intId, setId] = useState(-1);
    /*
        Define the useState HOOK for the index of hovered circle.
        The default value is -1, which means no circle is hovered.
        Use this HOOK to define the legend label and cursor. 
        Then, when we use setId to update the current index, the label and cursor will be updated automatically
    */

    const size = { width: 800, height: 500, margin: 50 };
    const scale = {
        y: d3.scaleLinear().domain(['min', 'max'].map(x => d3[x](Object.values(objData).flat()))).range([size.height - size.margin, size.margin]),
        x: d3.scalePoint().domain(d3.range(Object.values(objData)[0].length)).range([size.margin, size.width - size.margin]),
        c: d3.scaleOrdinal(d3.schemeCategory10)
    }
    /*
        Define X scale, Y scale, and color scale.
        Since we are using the same scales for multiple components, we can define these scales in a single object for easy passing. 
    */

    const xAxis = useRef();
    const yAxis = useRef();
    /*
        Define these two useRef HOOK to access DOM elements
    */

    useEffect(() => {
        /*
        *************************************************************
        * write code here to create X axis and Y axis using d3      *
        *   d3.select(xAxis.current).call(...)                      *
        *   d3.select(yAxis.current).call(...)                      *
        *************************************************************
        */
    });

    return (
        <svg viewBox={`0 0 ${size.width} ${size.height}`}>
            <g ref={xAxis} className='x axis' transform={`translate(0,${size.height - size.margin})`} />
            <g ref={yAxis} className='y axis' transform={`translate(${size.margin},0)`} />
                {/*
                    There two container are used to render X axis and Y axis.
                    Define position using transform.
                    Define the useRef so that we can select them using d3 and then call d3.axis() in a useEffect HOOK.
                */}
            {intId >= 0 ? <Cursor yrange={scale.y.range()} position={scale.x(intId)} /> : null} 
                {/* 
                    Define the cursor first, then it is rendered at the bottom layer in the page.
                    If intId < 0, which means no circle is hovered, we don't render the cursor.
                    Only pass the position information to the cursor component.
                    THINKING: If we want the cursor moving with the mouse, how should we modify the code?
                */}
            <Lines data={objData} scale={scale} />
                {/*
                    Pass data and scale to Lines component to render the layer of lines.
                */}
            <Points data={objData} scale={scale} hover={Hover} />
                {/*
                    Pass data and scale to Points component to render circles on lines.
                    Pass Hover method to circle. When we hover on a circle, the event listener can call this method to update the index of hovered circle.
                */}
            {/* <Label data={objData} scale={scale} current={intId} /> */}
                {/*
                    Pass data, scale, and index of hovered circle to Label component to render the legend.
                    Uncomment this to show the legend panel. (You don't need to write code on this component.)
                */}
        </svg>
    );
}

export default App;
