// -------------------- Goals --------------------
import { week, month, longRuns, fitness, shape, unlocks, completedGoals } from './state.js';

export const goals = [
  {
    id: "unlock5k",
    condition: () => (week >= 1),
    reward: () => { unlocks["5k"] = true; },
    flavor: "🎉 You unlocked the 5K! Time to test your first race."
  },
  {
    id: "unlock10k",
    condition: () => (week >= 4 && longRuns >= 2),
    reward: () => { unlocks["10k"] = true; },
    flavor: "🎉 10K unlocked! Double the distance, double the fun."
  },
  {
    id: "unlockHalf",
    condition: () => (month >= 2 && longRuns >= 4 && fitness >= 20),
    reward: () => { unlocks["half"] = true; },
    flavor: "🎉 Half Marathon unlocked! You’re ready for the grind."
  },
  {
    id: "unlockFull",
    condition: () => (month >= 6 && fitness >= 30 && shape >= 50),
    reward: () => { unlocks["full"] = true; },
    flavor: "🎉 Marathon unlocked! The ultimate challenge awaits."
  }
];

export function checkGoals() {
  goals.forEach(g => {
    if (!completedGoals[g.id] && g.condition()) {
      g.reward();
      completedGoals[g.id] = true;
      document.getElementById("message").innerText = g.flavor;
    }
  });
}
