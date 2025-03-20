/**
 * Utility functions for trajectory calculations
 */

/**
 * Generate points along a complex trajectory between start and end points
 * @param {Object} startPoint - Starting coordinates {x, y}
 * @param {Object} endPoint - Ending coordinates {x, y}
 * @param {Array} controlPoints - Array of control points for the trajectory
 * @param {number} numPoints - Number of points to generate along the path
 * @returns {Array} Array of points along the trajectory
 */
export const generateTrajectory = (startPoint, endPoint, controlPoints, numPoints = 300) => {
  const trajectory = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const point = createCurvePoint(t, startPoint, endPoint, controlPoints);
    
    trajectory.push({
      x: point.x,
      y: point.y,
      progress: t
    });
  }
  
  return trajectory;
};

/**
 * Create a point along a complex curve using bezier-like interpolation
 * @param {number} t - Interpolation parameter (0-1)
 * @param {Object} start - Starting point {x, y}
 * @param {Object} end - Ending point {x, y}
 * @param {Array} controls - Control points for the curve
 * @returns {Object} Interpolated point {x, y}
 */
export const createCurvePoint = (t, start, end, controls) => {
  if (t === 0) return start;
  if (t === 1) return end;
  
  const numSegments = controls.length;
  const segmentIndex = Math.min(Math.floor(t * numSegments), numSegments - 1);
  const segmentT = (t * numSegments) - segmentIndex;
  
  let p0, p1, p2;
  
  if (segmentIndex === 0) {
    p0 = start;
    p1 = controls[0];
    p2 = controls[1] || end;
  } else if (segmentIndex === numSegments - 1) {
    p0 = controls[segmentIndex - 1] || start;
    p1 = controls[segmentIndex];
    p2 = end;
  } else {
    p0 = controls[segmentIndex - 1];
    p1 = controls[segmentIndex];
    p2 = controls[segmentIndex + 1];
  }
  
  // Quadratic Bezier interpolation for each segment
  return {
    x: Math.pow(1 - segmentT, 2) * p0.x + 2 * (1 - segmentT) * segmentT * p1.x + Math.pow(segmentT, 2) * p2.x,
    y: Math.pow(1 - segmentT, 2) * p0.y + 2 * (1 - segmentT) * segmentT * p1.y + Math.pow(segmentT, 2) * p2.y
  };
};

/**
 * Calculate color for a data point based on its progress along the trajectory
 * @param {number} progress - Progress along the trajectory (0-1)
 * @returns {string} RGB color string
 */
export const calculatePointColor = (progress) => {
  if (progress < 0.5) {
    // Blend from blue to purple
    const t = progress / 0.5;
    return `rgb(${Math.round(63 + 117 * t)}, ${Math.round(81 + 0 * t)}, ${Math.round(181 + 0 * t)})`;
  } else {
    // Blend from purple to red
    const t = (progress - 0.5) / 0.5;
    return `rgb(${Math.round(180 + 65 * t)}, ${Math.round(81 - 71 * t)}, ${Math.round(181 - 97 * t)})`;
  }
}; 