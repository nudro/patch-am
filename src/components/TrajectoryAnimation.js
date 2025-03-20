import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import * as d3 from 'd3';
import { generateTrajectory, calculatePointColor } from '../utils/trajectoryUtils';
import './TrajectoryAnimation.css';

const TrajectoryAnimation = ({ isAnimating, speed, showTrajectory, showDecisionBoundary }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [trajectory, setTrajectory] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [progress, setProgress] = useState(0);
  
  // Generate trajectory path when dimensions change
  useEffect(() => {
    // Initial and target points
    const startPoint = { x: dimensions.width * 0.2, y: dimensions.height * 0.7 };
    const endPoint = { x: dimensions.width * 0.8, y: dimensions.height * 0.3 };
    
    // Control points for the advanced path
    const controlPoints = [
      { x: dimensions.width * 0.4, y: dimensions.height * 0.75 },
      { x: dimensions.width * 0.5, y: dimensions.height * 0.4 },
      { x: dimensions.width * 0.6, y: dimensions.height * 0.6 },
      { x: dimensions.width * 0.7, y: dimensions.height * 0.35 }
    ];
    
    // Use utility function to generate the trajectory
    const newTrajectory = generateTrajectory(startPoint, endPoint, controlPoints);
    
    setTrajectory(newTrajectory);
    setCurrentPosition(newTrajectory[0]);
  }, [dimensions]);
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ 
          width: Math.min(width, 800), 
          height: Math.min(width * 0.6, 500)
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Animation effect
  useEffect(() => {
    if (!trajectory.length) return;
    
    let animationFrameId;
    let lastTimestamp;
    const animationDuration = 11000 / speed; // Speed factor affects duration
    
    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (isAnimating) {
        // Update progress based on elapsed time and animation duration
        setProgress(prev => {
          const newProgress = prev + (elapsed / animationDuration);
          return newProgress >= 1 ? 0 : newProgress; // Reset when complete
        });
        
        // Find the closest point on the trajectory for the current progress
        const index = Math.min(
          Math.floor(progress * trajectory.length),
          trajectory.length - 1
        );
        
        setCurrentPosition(trajectory[index]);
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    if (isAnimating) {
      animationFrameId = requestAnimationFrame(animate);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating, trajectory, progress, speed]);
  
  // D3 visualization setup
  useEffect(() => {
    if (!svgRef.current || !trajectory.length || !currentPosition) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear SVG
    
    // Draw decision boundary
    if (showDecisionBoundary) {
      const boundary = [
        { x: dimensions.width * 0.55, y: dimensions.height * 0.1 },
        { x: dimensions.width * 0.45, y: dimensions.height * 0.9 }
      ];
      
      const lineGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y);
      
      svg.append('path')
        .datum(boundary)
        .attr('class', 'decision-boundary')
        .attr('d', lineGenerator)
        .attr('stroke', '#ff9800')
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', '10,6')
        .attr('fill', 'none');
      
      // Add boundary label
      svg.append('text')
        .attr('x', dimensions.width * 0.57)
        .attr('y', dimensions.height * 0.2)
        .attr('class', 'boundary-label')
        .text('Decision Boundary')
        .attr('fill', '#ff9800')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold');
    }
    
    // Draw class regions
    svg.append('text')
      .attr('x', dimensions.width * 0.25)
      .attr('y', dimensions.height * 0.15)
      .attr('class', 'class-label')
      .text('Class Ci')
      .attr('fill', '#3f51b5')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold');
      
    svg.append('text')
      .attr('x', dimensions.width * 0.75)
      .attr('y', dimensions.height * 0.15)
      .attr('class', 'class-label')
      .text('Class Ct')
      .attr('fill', '#f50057')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold');
    
    // Draw trajectory path
    if (showTrajectory) {
      const lineGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasis); // Smooth curve
      
      svg.append('path')
        .datum(trajectory)
        .attr('class', 'trajectory-path')
        .attr('d', lineGenerator)
        .attr('stroke', 'rgba(0, 0, 0, 0.2)')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
      
      // Add arrow markers along the path
      const arrowInterval = Math.floor(trajectory.length / 8);
      for (let i = 1; i < 8; i++) {
        const index = i * arrowInterval;
        const point = trajectory[index];
        const nextPoint = trajectory[Math.min(index + 10, trajectory.length - 1)];
        
        // Calculate angle for the arrow
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        
        svg.append('path')
          .attr('d', 'M0,-5L10,0L0,5')
          .attr('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`)
          .attr('fill', 'rgba(0, 0, 0, 0.3)');
      }
    }
    
    // Draw the start and end points
    svg.append('circle')
      .attr('class', 'start-point')
      .attr('cx', trajectory[0].x)
      .attr('cy', trajectory[0].y)
      .attr('r', 8)
      .attr('fill', '#3f51b5');
      
    svg.append('text')
      .attr('x', trajectory[0].x - 5)
      .attr('y', trajectory[0].y - 15)
      .text('x₀')
      .attr('fill', '#3f51b5')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold');
    
    svg.append('circle')
      .attr('class', 'end-point')
      .attr('cx', trajectory[trajectory.length - 1].x)
      .attr('cy', trajectory[trajectory.length - 1].y)
      .attr('r', 8)
      .attr('fill', '#f50057');
      
    svg.append('text')
      .attr('x', trajectory[trajectory.length - 1].x - 25)
      .attr('y', trajectory[trajectory.length - 1].y - 15)
      .text('x₀ + δ')
      .attr('fill', '#f50057')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold');
    
  }, [dimensions, trajectory, currentPosition, showTrajectory, showDecisionBoundary]);
  
  return (
    <Box 
      ref={containerRef}
      className="animation-container"
      sx={{ 
        width: '100%', 
        maxWidth: 800,
        height: dimensions.height,
        position: 'relative',
        mb: 4
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="trajectory-svg"
      />
      
      {currentPosition && (
        <motion.div
          className="data-point"
          animate={{
            x: currentPosition.x - 10, // Center the 20px dot
            y: currentPosition.y - 10,
            backgroundColor: calculatePointColor(progress)
          }}
          transition={{ type: "spring", damping: 15 }}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            zIndex: 10
          }}
        />
      )}
      
      {/* Class region indicators */}
      <div className="class-region class-region-i"></div>
      <div className="class-region class-region-t"></div>
      
      {/* Progress label */}
      <div className="progress-label">
        {isAnimating ? `Progress: ${Math.round(progress * 100)}%` : ''}
      </div>
    </Box>
  );
};

export default TrajectoryAnimation; 