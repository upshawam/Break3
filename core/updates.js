import { state } from './state.js';
import { setMetric, setFatigueBar, formatPace, classifyVO2 } from './helpers.js';
import { checkEndgame } from './endgame.js';

export function updateStats() {
  // Basic stats
  document.getElementById("stats").innerText =
    `Fitness: ${state.fitness} | Energy: ${state.energy}`;

  // Derived metrics
  let ctl = state.fitness;
  let atl = state.fatigue;
  let tsb = ctl - atl;
  let vo2 = Math.max(20, 30 + state.fitness * 0.5 - state.fatigue * 0.2);

  state.shape = Math.min(100, (state.fitness / 50) * 100);

  setMetric("fitnessBar", "fitnessVal", ctl, 100, "green");
  setFatigueBar(atl);
  setMetric("tsbBar", "tsbVal", tsb, 50, "blue");
  setMetric("vo2Bar", "vo2Val", vo2, 80, "purple");
  document.getElementById("vo2Val").innerText =
    `${vo2.toFixed(1)} (${classifyVO2(vo2)})`;
  setMetric("shapeBar", "shapeVal", state.shape, 100, "teal");

  // Predicted 5K time
  let pace = state.basePace - (state.fitness * 0.05) + (state.fatigue * 0.03);
  if (pace < 5) pace = 5;
  let time = pace * 3.1;
  let minutes = Math.floor(time);
  let seconds = Math.floor((time - minutes) * 60);
  document.getElementById("predicted").innerText =
    `Predicted 5K: ${minutes}:${seconds.toString().padStart(2,"0")} at ${formatPace(pace)}`;

  checkEndgame();
}
