import {recreateShortestPath} from "./dijkstra";

export function bfs_bidirectional(grid, startNode, endNode) {
    const s_queue = [startNode];
    const e_queue = [endNode];
    const s_visited = new Set();
    const e_visited = new Set();
    const s_parent = new Map();
    const e_parent = new Map();
    const allNodesExplored = [];
    let pathToNode = [];
    const dI = [-1, 1, 0, 0] // 4 directions in array format
    const dJ = [0, 0, -1, 1] // 4 directions in array format
    let intersectionNode = { node: null };
    s_visited.add(startNode);
    e_visited.add(endNode);
    s_parent.set(startNode, null);
    e_parent.set(endNode, null);
    
    while (s_queue.length > 0 && e_queue.length > 0) {
        bfs_step(grid, s_queue, s_visited, s_parent, allNodesExplored, dI, dJ);
        bfs_step(grid, e_queue, e_visited, e_parent, allNodesExplored, dI, dJ);
        isIntersecting(s_visited, e_visited, intersectionNode);
        if (intersectionNode.node != null) {
            let startPath = recreateShortestPath(s_parent, intersectionNode.node);
            let endPath = recreateShortestPath(e_parent, intersectionNode.node);
            pathToNode = [...startPath, ...endPath.reverse()];
            break;
        }
    }
    return {
        shortestPath: pathToNode,
        fullPath: allNodesExplored
    };
}

function bfs_step(grid, queue, visited, parent, allNodesExplored, dI, dJ) {
    let root = queue.shift();
    allNodesExplored.push(root);
    for (let k = 0; k < 4; k++) {
        if (root.row + dI[k] < 0 || root.row + dI[k] >= grid.length || 
            root.col + dJ[k] < 0 || root.col + dJ[k] >= grid[0].length)
            continue;
        const neighbor = grid[root.row + dI[k]][root.col + dJ[k]];
        if (!visited.has(neighbor) && !neighbor.isWall) {
            visited.add(neighbor);
            parent.set(neighbor, root);
            queue.push(neighbor);
        }
    }
}

function isIntersecting(s_visited, e_visited, intersectionNode) {
    for (let sNode of s_visited) {
        for (let eNode of e_visited) {
            if (sNode === eNode) {
                intersectionNode.node = sNode;
                return;
            }
        }
    }
}