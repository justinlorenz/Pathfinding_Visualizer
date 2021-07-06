const HORIZONTAL = 0;
const VERTICAL = 1;

export function maze_generation(grid, queue) {
    divide(grid, queue, 0, 0, grid.length, grid[0].length, choose_orientation(grid.length, grid[0].length));
}

function divide(grid, queue, y, x, height, width, orientation) {
    if (height < 4 || width < 4)
        return;
    
    let horizontal = (orientation === HORIZONTAL);
    let new_wall;
    let new_hole;
    let new_height;
    let new_width;
    let y_pair; 
    let x_pair;
    let new_height_pair;
    let new_width_pair;

    if (horizontal) {
        new_wall = y + (2 * Math.floor(Math.floor(getRandomIntInclusive(2, height - 3)) / 2));
        new_hole = x + (2 * Math.floor(Math.floor(getRandomIntInclusive(1, width - 2)) / 2 ) + 1);

        for (let i = x; i < (x + width); i++) {
            if (i !== new_hole && !grid[new_wall][i].isStart && !grid[new_wall][i].isEnd)
                queue.push(grid[new_wall][i]);
        }

        new_height = new_wall - y + 1;
        new_width = width;
        y_pair = new_wall;
        x_pair = x;
        new_height_pair = y + height - new_wall;
        new_width_pair = width;
    }
    else {
        new_wall = x + (2 * Math.floor(Math.floor(getRandomIntInclusive(2, width - 3)) / 2));
        new_hole = y + (2 * Math.floor(Math.floor(getRandomIntInclusive(1, height - 2)) / 2 ) + 1);

        for (let i = y; i < (y + height); i++) {
            if (i !== new_hole && !grid[i][new_wall].isStart && !grid[i][new_wall].isEnd)
                queue.push(grid[i][new_wall]);
        }

        new_height = height;
        new_width = new_wall - x + 1;
        y_pair = y;
        x_pair = new_wall;
        new_height_pair = height;
        new_width_pair = x + width - new_wall;
    }
    divide(grid, queue, y, x, new_height, new_width, choose_orientation(new_height, new_width));
    divide(grid, queue, y_pair, x_pair, new_height_pair, new_width_pair, choose_orientation(new_height_pair, new_width_pair));
}

function choose_orientation(height, width) {
    if (width < height) 
        return HORIZONTAL; 
    else if (height < width) 
        return VERTICAL;
    return (Math.floor(Math.random() * 2) === 0) ? HORIZONTAL : VERTICAL;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
