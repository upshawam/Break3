import { state } from './state.js';

export function checkEndgame() {
  if (state.gameOver) return;

  if (state.fitness >= 50) {
    document.getElementById("endgame").innerText = "💪 Legendary Fitness Achieved!";
    // milestone only, not game over
  }
  if (state.fatigue >= 30) {
    document.getElementById("endgame").innerText = "💀 Injured! Season Over.";
    state.gameOver = true;
  }
}
