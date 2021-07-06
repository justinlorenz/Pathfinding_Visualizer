export function dijkstra(grid, startNode, endNode) {
    let allNodesExplored = [];
    let prevNodes = new Map(); 
    let totalCost = new Map();
    let queue = []; // minHeap
    const dI = [-1, 1, 0, 0] // 4 directions in array format
    const dJ = [0, 0, -1, 1] // 4 directions in array format

    for (let m = 0; m < grid.length; m++) {
        for (let n = 0; n < grid[0].length; n++) {
            let v = grid[m][n];
            totalCost.set(v, Infinity);
            prevNodes.set(v, null);
            queue.push(v);
        }
    }
    totalCost.set(startNode, 0); 

    while (queue.length > 0) {
        sortPQ(queue, totalCost);
        let root = queue.shift(); 
        allNodesExplored.push(root);
        if (root.isWall)
            continue;
        if (root === endNode)
            break;
        for (let k = 0; k < 4; k++) {
            if (root.row + dI[k] < 0 || root.row + dI[k] >= grid.length || 
                root.col + dJ[k] < 0 || root.col + dJ[k] >= grid[0].length)
                continue;
            let neighbor = grid[root.row + dI[k]][root.col + dJ[k]];
            let alt = totalCost.get(root) + neighbor.weight;
            if (alt < totalCost.get(neighbor)) {
                totalCost.set(neighbor, alt);
                prevNodes.set(neighbor, root);
            }
        }
    }
    return {
        shortestPath: recreateShortestPath(prevNodes, endNode), 
        fullPath: allNodesExplored
    };
}

function sortPQ(queue, totalCost) {
    return queue.sort((nodeA, nodeB) => totalCost.get(nodeA) - totalCost.get(nodeB));
}

export function recreateShortestPath(prevNodes, endNode) {
    let pathToNode = [];
    let target = endNode;
    while (prevNodes.has(target)) {
      pathToNode.unshift(target);
      target = prevNodes.get(target);
    }
    return pathToNode;
}