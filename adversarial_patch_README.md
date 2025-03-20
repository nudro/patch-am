# Adversarial Patch Attack Visualization

This visualization demonstrates how adversarial patches can be used to fool object detection models through a Projected Gradient Descent (PGD) attack.

## Overview

Adversarial patches are a type of adversarial example that can be printed and placed in the physical world to attack computer vision systems. This visualization shows:

1. How a random patch gradually evolves to fool a detector
2. The effect of different attack parameters (epsilon, iterations, patch size)
3. The difference between targeted attacks (making a detector see a truck) and untargeted attacks (hiding a person)

## Features

- **Interactive 3D Visualization**: Built with Three.js for an immersive experience
- **Real-time Attack Simulation**: Watch as the patch evolves frame by frame
- **Multiple Attack Types**: Toggle between targeted and untargeted attacks
- **Configurable Parameters**: Adjust epsilon, iteration count, and patch size
- **Model Selection**: See how different object detectors (YOLOv3, YOLOv5, Faster R-CNN) respond
- **Detection Confidence Tracking**: View how model confidence changes during the attack

## Running the Visualization

### Prerequisites
- Python 3.x

### Quick Start
1. Make sure you have the following files:
   - `adversarial_patch_attack.html`
   - `run_adversarial_patch.sh`

2. Run the visualization server:
```bash
./run_adversarial_patch.sh
```

3. Open your browser and navigate to: http://localhost:8000/adversarial_patch_attack.html

## Technical Implementation

The visualization uses Three.js to create a 3D scene with:

### 1. Scene Components
- A person model (the target for untargeted attacks)
- A detection bounding box that shows model predictions
- An adversarial patch with dynamic texture

### 2. PGD Attack Simulation
The Projected Gradient Descent attack is simulated by:
- Starting with random noise in the patch
- Iteratively perturbing the patch texture in specific ways
- For targeted attacks: Evolving patterns resembling the target class (truck)
- For untargeted attacks: Creating high-frequency patterns to break detection features

### 3. Detection Simulation
The visualization simulates how detection confidence changes:
- For targeted attacks: Person confidence decreases while truck confidence increases
- For untargeted attacks: Person confidence gradually decreases until "No Detection"

## Educational Value

This visualization helps explain:
- How adversarial examples work in practice
- Why epsilon (perturbation constraint) matters in PGD attacks
- The difference between targeted and untargeted adversarial examples
- How different patterns affect detection confidence

## Further Reading

For more information on adversarial patches and PGD attacks:
- [Adversarial Patch (Brown et al.)](https://arxiv.org/abs/1712.09665)
- [Towards Evaluating the Robustness of Neural Networks (Carlini & Wagner)](https://arxiv.org/abs/1608.04644)
- [Physical Adversarial Examples Against Deep Neural Networks (Kurakin et al.)](https://arxiv.org/abs/1607.02533)

## License

MIT 