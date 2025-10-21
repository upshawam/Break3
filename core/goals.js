import { state } from './state.js';

// -------------------- Goals & Unlocks --------------------
export const goals = [
  {
    id: "unlock5k",
    condition: () => (state.fitness >= 8 || state.day >= 7), // must train a bit first
    reward: () => { state.unlocks["5k"] = true; },
    flavor: "🎉 You unlocked the 5K! Time to test your first race.",
    requirements: "Reach Fitness ≥ 8 OR survive through Week 1"
  },
  {
    id: "unlock10k",
    condition: () => (state.pbs["5k"] && state.longRuns >= 2),
    reward: () => { state.unlocks["10k"] = true; },
    flavor: "🎉 10K unlocked! Double the distance, double the fun.",
    requirements: "Finish a 5K race AND complete 2 long runs"
  },
  {
    id: "unlockHalf",
    condition: () => (state.month >= 2 && state.longRuns >= 4 && state.fitness >= 20),
    reward: () => { state.unlocks["half"] = true; },
    flavor: "🎉 Half Marathon unlocked! You’re ready for the grind.",
    requirements: "Reach Month 2, Fitness ≥ 20, and 4 long runs"
  },
  {
    id: "unlockFull",
    condition: () => (state.month >= 6 && state.fitness >= 30 && state.shape >= 50),
    reward: () => { state.unlocks["full"] = true; },
    flavor: "🎉 Marathon unlocked! The ultimate challenge awaits.",
    requirements: "Reach Month 6, Fitness ≥ 30, and Shape ≥ 50"
  }
];

// -------------------- Goal Checking --------------------
export function checkGoals() {
  let nextGoal = null;

  goals.forEach(g => {
    if (!state.completedGoals[g.id]) {
      if (g.condition()) {
        g.reward();
        state.completedGoals[g.id] = true;
        document.getElementById("message").innerText = g.flavor;
      } else if (!nextGoal) {
        // First unmet goal becomes the "next goal"
        nextGoal = g;
      }
    }
  });

  // Show next goal requirements in UI
  if (nextGoal) {
    document.getElementById("nextGoal").innerText =
      `Next Goal: ${nextGoal.requirements}`;
  } else {
    document.getElementById("nextGoal").innerText = "All goals completed!";
  }
}
