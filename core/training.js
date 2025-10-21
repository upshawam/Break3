import { state } from './state.js';
import { trainingTypes } from './trainingTypes.js';
import { advanceDay } from './helpers.js';
import { updateStats } from './updates.js';
import { checkGoals } from './goals.js';

export function showTraining() {
  if (!state.gameOver) {
    document.getElementById("trainingOptions").style.display = "block";
    document.getElementById("raceOptions").style.display = "none";
  }
}

export function doTraining(type) {
  if (state.gameOver) return;
  let t = trainingTypes[type];
  state.fitness += t.fitness;
  state.fatigue += t.fatigue;
  state.energy += t.energy;
  if (state.energy < 0) state.energy = 0;
  if (t.longRun) state.longRuns++;

  // Track last action
  state.lastAction = (type === "rest") ? "rest" : "training";

  document.getElementById("message").innerText = t.msg;
  advanceDay();
  updateStats();
  checkGoals();
}
