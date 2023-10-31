import React, { useState, useRef, useEffect } from 'react';
import './TraverseBFS.css';

function TraverseBFS() {
  const gridSize = 12;
  
  const middlePosition = Math.floor(gridSize * gridSize / 2) - Math.floor(gridSize / 2);

  const [currentPosition, setCurrentPosition] = useState(middlePosition);
  const [visited, setVisited] = useState({[middlePosition]: true})

    const getRandomGoalPosition = () => {
    let pos;
    do {
      pos = 1 + Math.floor(Math.random() * (gridSize * gridSize - 1));
    } while(pos === middlePosition); // Ensure we don't set the goal at the starting position
    return pos;
    }
   
  const [goalPosition, setGoalPosition] = useState(getRandomGoalPosition);

  const buttonClickedRef = useRef(false);

  const handleTraversal = () => {
    if (buttonClickedRef.current) {
      setGoalPosition(getRandomGoalPosition());
      setVisited({[middlePosition]: true}); // Reset visited cells
    } else {
      buttonClickedRef.current = true;
      startTraversal();
    }
  };

  const startTraversal = () => {
    let queue = [middlePosition];
    const visited = { [middlePosition]: true };

    const interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        return;
      }

      let pos = queue.shift();
      setCurrentPosition(pos);

      if (pos === goalPosition) {
        clearInterval(interval);
        return;
      }

      // Calculate neighbors
      let neighbors = [];

      // Check left neighbor, but not if on the left edge
      if (pos % gridSize !== 0) {
        neighbors.push(pos - 1);
      }

      // Check right neighbor, but not if on the right edge
      if ((pos + 1) % gridSize !== 0) {
        neighbors.push(pos + 1);
      }

      // Check top neighbor
      if (pos - gridSize >= 0) {
        neighbors.push(pos - gridSize);
      }

      // Check bottom neighbor
      if (pos + gridSize < gridSize * gridSize) {
        neighbors.push(pos + gridSize);
      }

      neighbors = neighbors.filter(neighbor => !visited[neighbor]); // Remove already visited neighbors
      neighbors.forEach(neighbor => visited[neighbor] = true);

      queue.push(...neighbors);
      setVisited(prevVisited => ({
        ...prevVisited,
        ...neighbors.reduce((acc, current) => ({ ...acc, [current]: true }), {})
      }));
      
    }, 30);
};

  useEffect(() => {
    if (buttonClickedRef.current) {
      startTraversal();
    }
  }, [goalPosition]);

  return (
    <div className="App">
      <header className="App-header">
      {currentPosition === goalPosition && <p>Found!</p>}
        <div className="grid" style={{"--gridSize": gridSize}}>
          {[...Array(gridSize * gridSize)].map((_, index) => (
            <div
              className={`cell ${visited[index] ? 'highlight' : ''}`}
              key={index}
            >
              {index === goalPosition ? "🍞" : ""}
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleTraversal}>Traverse BFS</button>
        </div>
      </header>
    </div>
  );
}

export default TraverseBFS;