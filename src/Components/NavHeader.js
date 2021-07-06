import React, { useState } from "react";
import "./css/NavHeader.scss";
import { Button, DropdownButton, Dropdown, Navbar, Container, Nav } from 'react-bootstrap';

function NavHeader(props) {
    const [algorithm, setAlgorithm] = useState("Choose Algorithm");
    const {reset, simulateAlgorithm, generateMaze, placeWeights} = props

    return (
        <Navbar bg="dark " variant="dark" expand="lg">
            <h2 className="header-nav">Pathfinding Visualizer</h2>
            <Container className="nav-buttons">
                    <Nav className="me-auto">
                        <DropdownButton className="nav-item" id="dropdown-basic-button" title={algorithm} >
                            <Dropdown.Item onClick={()=>setAlgorithm("DFS")}>DFS</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setAlgorithm("BFS")}>BFS</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setAlgorithm("Bidirectional BFS")}>Bidirectional BFS</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setAlgorithm("Dijkstra")}>Dijkstra</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setAlgorithm("A*")}>A*</Dropdown.Item>
                        </DropdownButton>
                        <Button className="nav-item" variant="warning" onClick={()=>generateMaze()}>Generate Maze</Button>
                        <Button className="nav-item" variant="success" onClick={()=>simulateAlgorithm(algorithm)}>Visualize Algorithm</Button>
                        <Button className="nav-item" variant="secondary" onClick={()=>placeWeights()}>Add Weights</Button>
                        <Button className="nav-item" variant="danger" onClick={()=>reset()}>Clear Grid</Button>
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default NavHeader;