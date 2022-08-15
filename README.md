# Pathfinding Visualizer

I spent a week building this project to try and learn Javascript/React for the first time. The various algorithms provided are DFS, BFS, Bidirectional BFS, Dijkstra's, A*, and recursive division maze generation. Read below for instructions on how to use the app. Click [HERE](https://justinlorenz.github.io/Pathfinding_Visualizer/) to play around with the visualizer. 

<img src="./imgs/visualization.gif" width="700">

## App Instructions
1. Click on the __start node__ or __end node__ to pick it up & click again to place it down
2. Click and drag on open cells to place __walls__ or click and drag on __walls__ to delete them
3. Choose your __algorithm__ from the dropdown
4. Feel free to __generate a random maze__, edit the generated maze yourself, or draw your own wall configurations
5. Click __add weights__ to allow you to place weights on the grid and click button again to stop 
  * Note: Weights only have an effect with weighted algorithms such as Dijkstra's - they deter the algorithm from going through the weighted nodes
6. Click **Visualize** to see the algorithm in effect
7. Click **Clear Grid** to clear the grid (Note: you can't clear mid-animation of the algorithm)

## Inspiration
This project idea was inspired by Clement Mihailescu. Check out the original github repo at https://github.com/clementmihailescu/Pathfinding-Visualizer

