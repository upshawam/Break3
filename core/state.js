// -------------------- Shared State --------------------
export const state = {
  fitness: 5,
  fatigue: 0,
  energy: 10,
  basePace: 11.5,
  gameOver: false,
  day: 1,
  week: 1,
  month: 1,
  longRuns: 0,
  shape: 0,
  pbs: { "5k": null, "10k": null, "half": null, "full": null },
  unlocks: { "5k": false, "10k": false, "half": false, "full": false },
  completedGoals: {},
  lastAction: null // NEW: track last action (training, rest, race)
};

export function resetGame() {
  state.fitness = 5;
  state.fatigue = 0;
  state.energy = 10;
  state.basePace = 11.5;
  state.gameOver = false;
  state.day = 1;
  state.week = 1;
  state.month = 1;
  state.longRuns = 0;
  state.shape = 0;
  state.pbs = { "5k": null, "10k": null, "half": null, "full": null };
  state.unlocks = { "5k": false, "10k": false, "half": false, "full": false };
  state.completedGoals = {};
  state.lastAction = null;

  document.getElementById("message").innerText = "Game reset. Back to square one!";
  document.getElementById("endgame").innerText = "";
}
