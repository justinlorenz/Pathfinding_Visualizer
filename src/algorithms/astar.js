import {recreateShortestPath} from "./dijkstra";

export function astar(grid, startNode, endNode) {
    let queue = [startNode];
    let visited = new Set();
    let prevNodes = new Map(); 
    let allNodesExplored = [];

    let gScore = new Map();
    let fScore = new Map();
    const dI = [-1, 1, 0, 0] // 4 directions in array format
    const dJ = [0, 0, -1, 1] // 4 directions in array format

    for (let m = 0; m < grid.length; m++) {
        for (let n = 0; n < grid[0].length; n++) {
            let v = grid[m][n];
            gScore.set(v, Infinity);
            fScore.set(v, Infinity);
            prevNodes.set(v, null);
        }
    }

    gScore.set(startNode, 0);
    fScore.set(startNode, hScore(startNode, endNode));

    while (queue.length > 0) {
        sortPQ(queue, fScore);
        let root = queue.shift();
        if (root.isWall || visited.has(root))
            continue;
        if (root === endNode)
            break;
        visited.add(root);
        allNodesExplored.push(root);
        for (let k = 0; k < 4; k++) {
            if (root.row + dI[k] < 0 || root.row + dI[k] >= grid.length || 
                root.col + dJ[k] < 0 || root.col + dJ[k] >= grid[0].length)
                continue;
            let neighbor = grid[root.row + dI[k]][root.col + dJ[k]];
            let tempGScore = gScore.get(root) + hScore(root, neighbor);
            if (tempGScore < gScore.get(neighbor)) {
                gScore.set(neighbor, tempGScore);
                fScore.set(neighbor, gScore.get(neighbor) + hScore(neighbor, endNode));
                prevNodes.set(neighbor, root);
                queue.push(neighbor);
            }
        }      
    }
    return {
        shortestPath: recreateShortestPath(prevNodes, endNode), 
        fullPath: allNodesExplored
    };
}

function hScore(node, endNode) {
    return Math.sqrt(Math.pow(node.row - endNode.row, 2) + Math.pow(node.col - endNode.col, 2))
}

function sortPQ(queue, fScore) {
    queue.sort((nodeA, nodeB)=>{return fScore.get(nodeA) - fScore.get(nodeB)});
}