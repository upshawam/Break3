import { state } from './state.js';
import { formatTime, formatPace, advanceDay, updatePBs } from './helpers.js';
import { updateStats } from './updates.js';
import { checkGoals } from './goals.js';

// -------------------- Show Race Options --------------------
export function showRaceOptions() {
  if (!state.gameOver) {
    document.getElementById("raceOptions").style.display = "block";
    document.getElementById("trainingOptions").style.display = "none";

    // Disable locked races
    document.querySelectorAll("#raceOptions button").forEach(btn => {
      let type = btn.getAttribute("id").replace("race", "").toLowerCase();
      if (type === "half") type = "half";
      if (type === "full") type = "full";
      btn.disabled = !state.unlocks[type];
    });
  }
}

// -------------------- Race Simulation --------------------
export function race(type) {
  if (state.gameOver) return;

  // Prevent back-to-back races
  if (state.lastAction === "race") {
    document.getElementById("message").innerText =
      "You already raced. Do some training or rest first!";
    return;
  }

  const distanceMiles = { "5k": 3.1, "10k": 6.2, "half": 13.1, "full": 26.2 }[type];
  let pace = state.basePace
           - (state.fitness * 0.05)
           + (state.fatigue * 0.03)
           + (Math.random() * 0.5 - 0.25);
  if (pace < 5) pace = 5;

  const finishTime = pace * distanceMiles;

  // Show race result
  document.getElementById("message").innerText =
    `${type.toUpperCase()} Finish: ${formatTime(finishTime)} at ${formatPace(pace)}`;

  // Update PB if better
  if (!state.pbs[type] || finishTime < state.pbs[type]) {
    state.pbs[type] = finishTime;
    updatePBs();
  }

  // Apply race effects
  switch (type) {
    case "5k":
      state.fatigue += 5;
      state.energy -= 3;
      state.fitness += 1;
      break;
    case "10k":
      state.fatigue += 7;
      state.energy -= 4;
      state.fitness += 2;
      break;
    case "half":
      state.fatigue += 10;
      state.energy -= 6;
      state.fitness += 3;
      break;
    case "full":
      state.fatigue += 15;
      state.energy -= 8;
      state.fitness += 5;
      break;
  }
  if (state.energy < 0) state.energy = 0;

  // Break 3 condition (marathon only)
  if (type === "full" && finishTime <= 180) {
    document.getElementById("endgame").innerText = "🏆 You Broke 3! Congratulations!";
    state.gameOver = true;
  }

  // Track last action
  state.lastAction = "race";

  // Advance time and update UI
  advanceDay();
  updateStats();
  checkGoals();
}
