// index.js
import { resetGame } from './core/state.js';
import { updatePBs } from './core/helpers.js';
import { checkGoals } from './core/goals.js';
import { showTraining, doTraining } from './core/training.js';
import { showRaceOptions, race } from './core/racing.js';
import { updateStats } from './core/updates.js';

// Hook up buttons once DOM is ready
window.onload = () => {
  resetGame();
  updateStats();
  updatePBs();
  checkGoals();

  // Main controls
  document.getElementById("trainBtn").onclick = showTraining;
  document.getElementById("raceBtn").onclick = showRaceOptions;
  document.getElementById("resetBtn").onclick = () => {
    resetGame();
    updateStats();
    updatePBs();
    checkGoals();
  };

  // Training buttons
  document.getElementById("easyBtn").onclick = () => doTraining("easy");
  document.getElementById("speedBtn").onclick = () => doTraining("speed");
  document.getElementById("longBtn").onclick = () => doTraining("long");
  document.getElementById("restBtn").onclick = () => doTraining("rest");

  // Race buttons
  document.getElementById("race5k").onclick = () => race("5k");
  document.getElementById("race10k").onclick = () => race("10k");
  document.getElementById("raceHalf").onclick = () => race("half");
  document.getElementById("raceFull").onclick = () => race("full");
};
