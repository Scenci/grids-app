import React, { useState, useRef, useEffect } from 'react';
import './Sandbox1.css';

function Sandbox1() {
  const gridSize = 12;
  const [currentPosition, setCurrentPosition] = useState(0);

  const getRandomGoalPosition = () => {
    return 1 + Math.floor(Math.random() * (gridSize * gridSize - 1));
}

const [goalPosition, setGoalPosition] = useState(getRandomGoalPosition);

  // Create a ref to track button clicks
  const buttonClickedRef = useRef(false);

  const handleTraversal = () => {
    // If button is clicked subsequent times, reset the goal first.
    if (buttonClickedRef.current) {
      setGoalPosition(getRandomGoalPosition());

    } else {
      buttonClickedRef.current = true; // Indicate that the button has been clicked
      startTraversal(); // Start traversal for the first click
    }
  };

  const startTraversal = () => {
    let pos = 0;
    const interval = setInterval(() => {
      setCurrentPosition(pos);

      if (pos === goalPosition) {
        clearInterval(interval);
        return;
      }

      pos++;
      if (pos >= gridSize * gridSize) clearInterval(interval);
    }, 30);
  };

  // This effect listens for changes in goalPosition and starts traversal
  // only when the goalPosition changes after the first button click.
  useEffect(() => {
    if (buttonClickedRef.current) {
      startTraversal();
    }
  }, [goalPosition]);


  return (
    <div className="App">
      <header className="App-header">
      {currentPosition === goalPosition && <p>Found!</p>} {/* Conditionally display based on currentPosition */}
        <div className="grid" style={{"--gridSize": gridSize}}> {/*dynamically updates the columns to match the gridsize in a square.*/}
       
          {[...Array(gridSize * gridSize)].map((_, index) => (
            <div
              className={`cell ${index === currentPosition ? 'highlight' : ''}`}
              key={index}
            >
              {index === goalPosition ? "🍑" : ""}
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleTraversal}>Traverse Grid</button><br></br>
         
        
        </div>
      </header>
    </div>
  );
}

export default Sandbox1;
