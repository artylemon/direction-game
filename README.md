# Direction Game 🧭

A fun, interactive browser-based game designed to help players improve their reaction time and directional awareness (Left vs. Right). Built with React, TypeScript, and Vite.

## 🎮 Game Overview

The goal is simple: Identify the correct direction as quickly as possible!

### Current Features
*   **Word Mode:** A direction (e.g., "LEFT") appears on screen, and you must press the corresponding arrow key.
*   **Time Attack:** Race against the clock with adjustable durations (15s, 30s, 60s).
*   **Scoring System:**
    *   Points awarded for correct answers.
    *   **Speed Bonus:** Get extra points for answering in under 1 second!
    *   **Penalty:** Incorrect answers stun your controls for 1 second.
*   **Responsive Controls:** On-screen D-Pad/Arrow keys.

### Planned Features (Roadmap)
*   **Arrow Mode:** Identify the direction of a visual arrow.
*   **Highlight Mode:** Identify which section of the screen is highlighted.
*   **Settings:** Toggle between "Left/Right" and "West/East" (Cardinal directions).
*   **High Scores:** Local storage of best runs.

## 🛠️ Tech Stack

*   **Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Styling:** CSS Modules & Utility Classes (Tailwind CSS pending integration)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd direction-game
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (Controls, ScoreBoard)
├── context/      # Global state (Settings)
├── hooks/        # Game logic (Timer, Scoring, State Machine)
├── pages/        # Main screens (Home, Game, Settings)
├── types/        # TypeScript definitions
└── utils/        # Helper functions
```

## 🤝 Contributing

This project is a learning exercise. Feel free to fork and experiment!
