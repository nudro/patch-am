import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TrajectoryAnimation from './components/TrajectoryAnimation';
import AnimationControls from './components/AnimationControls';
import './App.css';

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [showTrajectory, setShowTrajectory] = useState(true);
  const [showDecisionBoundary, setShowDecisionBoundary] = useState(true);
  
  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  };
  
  const handleAnimationToggle = () => {
    setIsAnimating(!isAnimating);
  };
  
  const handleTrajectoryToggle = () => {
    setShowTrajectory(!showTrajectory);
  };
  
  const handleDecisionBoundaryToggle = () => {
    setShowDecisionBoundary(!showDecisionBoundary);
  };

  return (
    <Container className="app-container">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Adversarial Trajectory Animation
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Visualizing how data point x₀ from class C<sub>i</sub> moves to target class C<sub>t</sub>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TrajectoryAnimation 
          isAnimating={isAnimating}
          speed={speed}
          showTrajectory={showTrajectory}
          showDecisionBoundary={showDecisionBoundary}
        />
      </Box>
      
      <AnimationControls 
        isAnimating={isAnimating}
        speed={speed}
        showTrajectory={showTrajectory}
        showDecisionBoundary={showDecisionBoundary}
        onAnimationToggle={handleAnimationToggle}
        onSpeedChange={handleSpeedChange}
        onTrajectoryToggle={handleTrajectoryToggle}
        onDecisionBoundaryToggle={handleDecisionBoundaryToggle}
      />
      
      <Box sx={{ mt: 4, bgcolor: '#f9f9f9', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          About This Visualization
        </Typography>
        <Typography paragraph>
          This animation shows how a data point (x₀) can be gradually moved from its original class (C<sub>i</sub>) to a 
          target class (C<sub>t</sub>) by following a specific trajectory, similar to how adversarial examples are crafted.
        </Typography>
        <Typography paragraph>
          The curving trajectory represents the path an optimization algorithm might take to find the minimal perturbation
          needed to cross the decision boundary between classes while maintaining visual similarity to the original input.
        </Typography>
      </Box>
    </Container>
  );
}

export default App; 