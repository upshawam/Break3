// -------------------- State --------------------
export let fitness, fatigue, energy, basePace, gameOver;
export let day, week, month;
export let longRuns;
export let shape;
export let pbs;
export let unlocks;
export let completedGoals;

// Reset game state
export function resetGame() {
  fitness = 5;
  fatigue = 0;
  energy = 10;
  basePace = 11.5;
  gameOver = false;
  day = 1;
  week = 1;
  month = 1;
  longRuns = 0;
  shape = 0;
  pbs = { "5k": null, "10k": null, "half": null, "full": null };
  unlocks = { "5k": false, "10k": false, "half": false, "full": false };
  completedGoals = {};

  document.getElementById("message").innerText = "Game reset. Back to square one!";
  document.getElementById("endgame").innerText = "";
}
