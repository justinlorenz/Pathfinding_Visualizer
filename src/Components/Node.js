import React from "react";
import "./css/Node.scss";

function Node(props) {
    const {row, col, isStart, isEnd, isWall, isVisited,  handleMouseDown, 
        handleMouseEnter, handleMouseUp, isWeight, isPath} = props;
    let addedClassName = isStart ? "node-start" : isEnd ? "node-end" : 
                            isWall ? "node-wall" : isPath ? "node-path" : 
                            isVisited ? "node-visited" :  isWeight  ? "node-weight" : "";
    return (
        <div 
            id={`${row}, ${col}`}
            className={`node ${addedClassName}`}
            onMouseDown={() => handleMouseDown(row, col)}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseUp={() => handleMouseUp()}
        >
        </div>
    )
  
}




export default Node;