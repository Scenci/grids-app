import React, { useState, useRef, useEffect } from 'react';
import './TraverseDijkstra.css';
import CodeDisplay from '../components/CodeDisplay';


function TraverseDijkstra() {
  const gridSize = 12;
  
  const middlePosition = Math.floor(gridSize * gridSize / 2) - Math.floor(gridSize / 2);
  const [currentPosition, setCurrentPosition] = useState(middlePosition);
  const [visited, setVisited] = useState({[middlePosition]: true})

  //
  const [currentLine, setCurrentLine] = useState(null)
  

    //FUNC: intialization of the grid weights (randomly)
    const generateWeights = () => {
        let w = [];
        for(let i = 0; i < gridSize * gridSize; i++) {
            w.push(Math.floor(Math.random() * 10) + 1);
        }
        return w;
    }

    const [weights, setWeights] = useState(() => generateWeights());

    //FUNC: initialization of the GoalPosition
    const getRandomGoalPosition = () => {
    let pos;
    do {
        pos = 1 + Math.floor(Math.random() * (gridSize * gridSize - 1));
    } while(pos === middlePosition); // Ensure we don't set the goal at the starting position
    return pos;
    }
   
  const [goalPosition, setGoalPosition] = useState(getRandomGoalPosition);
  const buttonClickedRef = useRef(false);

  //FUNC: on click
  const handleTraversal = () => {
    if (buttonClickedRef.current) {

      setGoalPosition(getRandomGoalPosition());
      setWeights(generateWeights());

      setVisited({[middlePosition]: true}); // Reset visited cells
    } else {
      buttonClickedRef.current = true;
      startTraversal();

    }
  };

  //FUNC: onClick => start dijkstra
  const startTraversal = () => {
    const distances = Array(gridSize * gridSize).fill(Infinity);
    distances[middlePosition] = 0;

    let queue = [{ index: middlePosition, distance: 0 }];
    const visited = { [middlePosition]: true };

    const interval = setInterval(() => {
        if (queue.length === 0) {
            clearInterval(interval);
            return;
        }
        // Dequeue the node with the smallest distance
        queue.sort((a, b) => a.distance - b.distance);
        const current = queue.shift();
        setCurrentPosition(current.index);

        if (current.index === goalPosition) {
            clearInterval(interval);
            return;
        }
       
        let neighbors = [];

        // Check left neighbor, but not if on the left edge
        if (current.index % gridSize !== 0) {
            neighbors.push(current.index - 1);
        }

        // Check right neighbor, but not if on the right edge
        if ((current.index + 1) % gridSize !== 0) {
            neighbors.push(current.index + 1);
        }

        // Check top neighbor
        if (current.index - gridSize >= 0) {
            neighbors.push(current.index - gridSize);
        }

        // Check bottom neighbor
        if (current.index + gridSize < gridSize * gridSize) {
            neighbors.push(current.index + gridSize);
        }

        neighbors.forEach(neighbor => {
            if (!visited[neighbor]) {
                const tentativeDistance = distances[current.index] + weights[neighbor];
                if (tentativeDistance < distances[neighbor]) {
                    distances[neighbor] = tentativeDistance;
                    queue.push({ index: neighbor, distance: tentativeDistance });
                }
            }
        });

        setVisited(prevVisited => ({
            ...prevVisited,
            [current.index]: true
        }));
    }, 200);
};
  

  useEffect(() => {
    if (buttonClickedRef.current) {
      startTraversal();
    }
  }, [goalPosition]);

  return (
    <div className="App">
      <div className="MainContainer">
        {currentPosition === goalPosition && <p>Found!</p> }
        <div className="grid-button-container">
        <div className="grid-container" style={{"--gridSize": gridSize}}>
        {[...Array(gridSize * gridSize)].map((_, index) => (
        <div
        className={`
          cell 
          ${visited[index] ? 'highlight' : ''} 
          ${index === goalPosition && currentPosition === goalPosition ? 'goal-reached' : ''}
        `}
            key={index}
        >
             {index === goalPosition ? <span className="emoji">🌟</span> : null}
            <span className={`weight ${index === goalPosition ? 'in-goal' : ''}`}>{weights[index]}</span>

        </div>
        ))}
        
        </div>    

        <div>
          <button onClick={handleTraversal}>Traverse Dijkstra's</button>
        </div>
        </div> 
      
        <div className="code-container">
          <CodeDisplay currentLine={currentLine}/>
        </div>

      </div>
    </div>
  );
}

export default TraverseDijkstra;