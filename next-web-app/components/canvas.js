import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import Car from "./car2";
import Controls from "./controls2"
import Sensor from "./sensor2";

function Canvas() {
    // insert JS here:

    
    return (
        <React.Fragment>
            <Sensor />
            <Controls />
            <Car />
        </React.Fragment>
    )
}
export default Canvas;