import React from 'react';
import { Box, Typography, Slider, FormControlLabel, Switch, Button } from '@mui/material';

/**
 * Component for animation control UI elements
 */
const AnimationControls = ({ 
  isAnimating, 
  speed, 
  showTrajectory, 
  showDecisionBoundary,
  onAnimationToggle,
  onSpeedChange,
  onTrajectoryToggle,
  onDecisionBoundaryToggle
}) => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
      <Typography gutterBottom>Animation Speed</Typography>
      <Slider
        value={speed}
        min={1}
        max={10}
        step={1}
        onChange={onSpeedChange}
        valueLabelDisplay="auto"
        marks
        disabled={isAnimating}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={showTrajectory} 
              onChange={onTrajectoryToggle} 
              color="primary"
            />
          }
          label="Show Trajectory"
        />
        <FormControlLabel
          control={
            <Switch 
              checked={showDecisionBoundary} 
              onChange={onDecisionBoundaryToggle}
              color="primary" 
            />
          }
          label="Show Decision Boundary"
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button 
          variant="contained" 
          color={isAnimating ? "error" : "primary"} 
          onClick={onAnimationToggle}
          size="large"
        >
          {isAnimating ? "Stop Animation" : "Start Animation"}
        </Button>
      </Box>
    </Box>
  );
};

export default AnimationControls; 