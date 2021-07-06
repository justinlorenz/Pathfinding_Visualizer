import React, { useEffect, useState } from "react";
import NavHeader from "./NavHeader";
import Node from "./Node";
import "./css/Grid.scss";
import {dfs} from '../algorithms/dfs';
import {bfs} from '../algorithms/bfs';
import {dijkstra} from "../algorithms/dijkstra";
import {astar} from "../algorithms/astar";
import {bfs_bidirectional} from "../algorithms/bfs_bidirectional";
import {maze_generation} from "../algorithms/maze_generation";


// If the mouse is down & you enter another div => set that to isWall 


const GRID_ROWS = 26, GRID_COLS = 61;
const ANIMATION_SPEED = 10;
const starting_location = [GRID_ROWS / 2, Math.floor(GRID_COLS / 3)];
const ending_location = [GRID_ROWS / 2, Math.floor(GRID_COLS / 3) * 2];
const DEFAULT_NODE_WEIGHT = 1;
const WEIGHTED_NODE_WEIGHT = 100000;


function Grid() {
    const [grid, setGrid] = useState([]); // Controls current state of the grid
    const [mouseDown, setMouseDown] = useState(false); // Controls mouse clicks
    const [placeNode, setPlaceNode] = useState({ // Controls which object should be placed when a mouse click happens
      startNode: false,
      endNode: false, 
      weightNode: false
    });


    useEffect(() => { 
      setGrid(createInitialGrid(GRID_ROWS, GRID_COLS));
    }, []);
    

    function simulateAlgorithm(algorithm) {
      let paths = runAlgorithm(algorithm, grid);
      if (paths == null)
        return;
      const {shortestPath, fullPath} = paths;
      for (let i = 0; i <= fullPath.length; i++) {
        if (i === fullPath.length) {
          setTimeout(() => {
            renderShortestPath(shortestPath);
          }, ANIMATION_SPEED * i);
          return;
        }
        setTimeout(() => {
          const node = fullPath[i];
          let copyGrid = [...grid];
          copyGrid[node.row][node.col].isVisited = true;
          setGrid(copyGrid);
        }, ANIMATION_SPEED * i);
      }
    }
    
    function renderShortestPath(shortestPath) {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          let copyGrid = [...grid];
          copyGrid[node.row][node.col].isPath = true;
          setGrid(copyGrid);
        }, (ANIMATION_SPEED * 3) * i);
      }
    }

    function reset() {
      setGrid(createInitialGrid(GRID_ROWS, GRID_COLS));
    }

    function handleMouseDown(i, j) {
      setMouseDown(true);
      placeNewNode(i,j);
    }

    function handleMouseEnter(i,j) {
      if (!mouseDown)
        return;
      placeNewNode(i,j);
    }

    function handleMouseUp() {
      setMouseDown(false);
    }

    function placeWeights() {
      let placeNodeState = {...placeNode};
      placeNodeState.weightNode = !placeNodeState.weightNode;
      setPlaceNode(placeNodeState);
    }

    function placeNewNode(i, j) {
      let placeNodeState = { ...placeNode };
      let copyGrid = [...grid];
      if (copyGrid[i][j].isStart) { // if click start node -> delete and mark that need to place start node next
        copyGrid[i][j].isStart = false;
        placeNodeState.startNode = true;
      }
      else if (copyGrid[i][j].isEnd) { // if click end node -> delete and mark that need to place end node next
        copyGrid[i][j].isEnd = false;
        placeNodeState.endNode = true;
      }
      else if (placeNodeState.startNode) { // if need to place start node -> place it at i, j
        copyGrid[i][j].isStart = true;
        copyGrid[i][j].isWall = false;
        starting_location[0] = i;
        starting_location[1] = j;
        placeNodeState.startNode = false;
      }
      else if (placeNodeState.endNode) { // if need to place end node -> place it at i, j
        copyGrid[i][j].isEnd = true;
        copyGrid[i][j].isWall = false;
        ending_location[0] = i;
        ending_location[1] = j;
        placeNodeState.endNode = false;
      }
      else if (placeNodeState.weightNode) { // if need to place weight -> place it at i,j
        copyGrid[i][j].isWeight = true;
        copyGrid[i][j].weight = WEIGHTED_NODE_WEIGHT;
      }
      else if (copyGrid[i][j].isWall)
        copyGrid[i][j].isWall = false;
      else
        copyGrid[i][j].isWall = true;
      setGrid(copyGrid);
      setPlaceNode(placeNodeState);
    }

    function generateMaze() {
      let copyGrid = [...grid];
      let wallQueue = [];
      maze_generation(copyGrid, wallQueue);
      animateMazeGeneration(wallQueue);
    }

    function animateMazeGeneration(wallQueue) {
      for (let i = 0; i < wallQueue.length; i++) {
        setTimeout(() => {
          const node = wallQueue[i];
          let copyGrid = [...grid];
          copyGrid[node.row][node.col].isWall = true;
          setGrid(copyGrid);
        }, 10 * i);
      }
    }

    return (
      <div>
        <NavHeader reset={reset} simulateAlgorithm={simulateAlgorithm} generateMaze={generateMaze} placeWeights={placeWeights}/>
        <div className="grid" onMouseLeave={handleMouseUp}>
          {grid.map((row) => (
          <div className="board__row">
              {row.map((node) => (
                <Node
                row={node.row} 
                col={node.col} 
                isStart = {node.isStart}
                isEnd = {node.isEnd}
                isWall = {node.isWall}
                isVisited = {node.isVisited}
                isWeight = {node.isWeight}
                isPath = {node.isPath}
                weight = {node.weight}
                handleMouseDown={handleMouseDown}
                handleMouseEnter= {handleMouseEnter}
                handleMouseUp= {handleMouseUp}
                />
              ))}
              <br />
          </div>
          ))}
        </div>
      </div>
    );
}


function createInitialGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let currRow = [];
    for (let j = 0; j < cols; j++) {
          currRow.push(createNode(i,j));
    }
    grid.push(currRow);
  }
  return grid;
};

function createNode(row, col) {
  return {
      row: row,
      col: col,
      isStart: (row === starting_location[0] && col === starting_location[1]), 
      isEnd: (row === ending_location[0] && col === ending_location[1]),
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: DEFAULT_NODE_WEIGHT,
      isWeight: false
  };
};

function runAlgorithm(algoName, grid) {
  let copyGrid = [...grid];
  let paths;
  switch(algoName) {
    case "DFS":
      paths = dfs(copyGrid, copyGrid[starting_location[0]][starting_location[1]], copyGrid[ending_location[0]][ending_location[1]]);
      break;
    case "BFS":
      paths = bfs(copyGrid, copyGrid[starting_location[0]][starting_location[1]], copyGrid[ending_location[0]][ending_location[1]]);
      break;
    case "Dijkstra":
      paths = dijkstra(copyGrid, copyGrid[starting_location[0]][starting_location[1]], copyGrid[ending_location[0]][ending_location[1]]);
      break;
    case "A*":
      paths = astar(copyGrid, copyGrid[starting_location[0]][starting_location[1]], copyGrid[ending_location[0]][ending_location[1]]);
      break;
    case "Bidirectional BFS":
      paths = bfs_bidirectional(copyGrid, copyGrid[starting_location[0]][starting_location[1]], copyGrid[ending_location[0]][ending_location[1]]);
      break;
    default:
      break;
  }
  return paths;
}


export default Grid;