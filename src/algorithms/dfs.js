export function dfs(grid, startNode, endNode) {
    const visited = new Set();
    let pathToNode = [startNode]; 
    const allNodesExplored = [];
    const stack = [pathToNode];
    const dI = [-1, 1, 0, 0] // 4 directions in array format
    const dJ = [0, 0, -1, 1] // 4 directions in array format

    while (stack.length > 0) {
        pathToNode = stack.pop();
        let root = pathToNode[pathToNode.length - 1];
        if (!visited.has(root) && !root.isWall) {
            visited.add(root) // mark as visited this node
            allNodesExplored.push(root); // Add our root to our path
            if (root === endNode) // Found our end spot
                break;
            for (let k = 0; k < 4; k++) {
                if (root.row + dI[k] < 0 || root.row + dI[k] >= grid.length || 
                    root.col + dJ[k] < 0 || root.col + dJ[k] >= grid[0].length)
                    continue;
                const neighbor = grid[root.row + dI[k]][root.col + dJ[k]];
                const pathToNeighbor = [...pathToNode, neighbor];
                stack.push(pathToNeighbor);
            }
        }
    }
    return {
        shortestPath: pathToNode,
        fullPath: allNodesExplored
    };
}
