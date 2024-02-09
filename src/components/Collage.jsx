import { useEffect, useRef } from 'preact/hooks';
import Collage_Info from './Collage_Info';
import * as d3 from 'd3';

function CollageForceSimulation({ collages }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize random positions for collages
    collages.forEach(d => {
      d.x = Math.random() * width;
      d.y = Math.random() * height;
    });

    const simulation = d3.forceSimulation(collages)
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collide', d3.forceCollide().radius(10))
      .force('x', d3.forceX(centerX).strength(0.2)) // Attracts images towards the center horizontally
      .force('y', d3.forceY(centerY).strength(0.2)) // Attracts images towards the center vertically
      .alpha(0.1);

    const images = svg.selectAll('image')
      .data(collages)
      .enter()
      .append('image')
      .attr('xlink:href', d => d.data.src)
      .attr('width', 50)
      .attr('height', 50)
      .attr('x', d => d.x) // Start images at random x positions
      .attr('y', d => d.y); // Start images at random y positions

    const ticked = () => {
      images
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    };

    simulation.on('tick', ticked);

    return () => {
      simulation.stop();
    };
  }, [collages]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <Collage_Info infos={collages[1]} />
    </div>
  );
}

export default CollageForceSimulation;








/*
import { useEffect, useRef } from 'preact/hooks';
import Collage_Info from './Collage_Info';
import * as d3 from 'd3';

function CollageForceSimulation({ collages }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const centerX = width / 2;
    const centerY = height / 2;

    const simulation = d3.forceSimulation(collages)
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collide', d3.forceCollide().radius(10));

    const images = svg.selectAll('image')
      .data(collages)
      .enter()
      .append('image')
      .attr('xlink:href', d => d.data.src)
      .attr('width', 50)
      .attr('height', 50)
      .attr('x', d => d.x)
      .attr('y', d => d.y);

    const ticked = () => {
      images
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    };

    simulation.on('tick', ticked);

    return () => {
      simulation.stop();
    };
  }, [collages]);

  return <div>
        <svg ref={svgRef}></svg>
        <Collage_Info infos={collages[1]} />
    </div>
        
}

export default CollageForceSimulation;*/




/*import { useState, useEffect } from 'preact/hooks';
import Collage_Info from './Collage_Info';
import * as d3 from 'd3';

export default function Collage({ collages, tags }) {
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [collagePositions, setCollagePositions] = useState([]);

    useEffect(() => {
        const updateCanvasSize = () => {
            const windowWidth = window.innerWidth * 0.7;
            const windowHeight = window.innerHeight * 0.6;
            setCanvasSize({ width: windowWidth, height: windowHeight });
        };

        // Call updateCanvasSize initially to set up the canvas size
        updateCanvasSize();

        // Add event listener for window resize
        window.addEventListener("resize", updateCanvasSize);

        // Cleanup: remove event listener
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    useEffect(() => {
        // Generate random positions for collages
        const newCollagePositions = collages.map(() => ({
            x: Math.random() * canvasSize.width,
            y: Math.random() * canvasSize.height,
        }));
        setCollagePositions(newCollagePositions);
    }, [collages, canvasSize]);

    const generateCanvas = () => {
        if (collages.length > 0 && collagePositions.length === collages.length) {
            const svg = d3.select("#viewport");

            // Clear the canvas
            svg.selectAll("*").remove();

            // Add all collages to the canvas with random positions
            svg.selectAll("image")
                .data(collages)
                .enter()
                .append("image")
                .attr("x", (d, i) => collagePositions[i].x)
                .attr("y", (d, i) => collagePositions[i].y)
                .attr("href", d => d.data.src)
                .attr("width", 100) // Adjust image width
                .attr("height", 100); // Adjust image height
        }
    };

    // Call generateCanvas when the component mounts
    useEffect(() => {
        generateCanvas();
    }, [collagePositions]);

    return (
        <div>
            <svg id="viewport" width={canvasSize.width} height={canvasSize.height}></svg>
            <Collage_Info infos={collages[1]} />
        </div>
    );
}*/
