import React, { useState, useEffect } from 'react';
import './CodeDisplay.css';

const hardcodedAlgorithm=`
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
};`

function CodeDisplay( {currentLine} ) {  
    return (
        <pre>
            {hardcodedAlgorithm.split('\n').map((line, index) => (
                <div 
                    key={index} 
                    
                >
                    {line}
                </div>
            ))}
        </pre>
    );
}

export default CodeDisplay;
