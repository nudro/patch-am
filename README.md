# Adversarial Trajectory Animation

An interactive React application visualizing how data points can move across decision boundaries in machine learning models, similar to adversarial example generation.

## Overview

This visualization demonstrates how a data point (x₀) from an initial class (C_i) can be moved to a target class (C_t) by following a specific trajectory in the feature space. This concept is fundamental to understanding adversarial examples in machine learning, where small perturbations can cause misclassifications.

## Features

- **Interactive Animation**: Control the movement of data points across decision boundaries
- **Customizable Speed**: Adjust animation speed to observe the trajectory in detail
- **Visual Trajectory**: See the path with directional arrows showing the optimization process
- **Decision Boundary**: Visualize the separation between classes
- **Color Transitions**: Watch as the data point changes color when crossing class boundaries
- **Responsive Design**: Works on desktop and mobile devices

## Technical Implementation

The application is built using:
- **React**: For the UI and component architecture
- **D3.js**: For SVG visualization and path generation
- **Framer Motion**: For smooth animations of the data point
- **Material-UI**: For UI controls and layout

### Core Components

1. **TrajectoryAnimation**: Handles the visualization of the data point movement along the trajectory
2. **App**: Provides the user interface for controlling the animation

### Trajectory Generation

The trajectory is generated using a complex curve interpolation that simulates the path an optimization algorithm might take when finding adversarial examples:

1. Path follows a Bezier-like curve with multiple control points
2. Arrows indicate direction of movement
3. Color transitions represent how the model's confidence changes during the perturbation

## Running the Application

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
4. Open your browser to [http://localhost:3000](http://localhost:3000)

## Educational Use

This visualization can be used to explain:
- How adversarial examples work
- The concept of decision boundaries in machine learning
- How small perturbations can cause misclassifications
- The optimization process for finding adversarial examples

## License

MIT 