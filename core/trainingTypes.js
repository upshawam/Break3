export const trainingTypes = {
  easy:   { fitness: +1, fatigue: +1, energy: -1, msg: "Easy run builds aerobic base." },
  speed:  { fitness: +2, fatigue: +3, energy: -2, msg: "Intervals boost speed but add fatigue." },
  long:   { fitness: +2, fatigue: +2, energy: -3, msg: "Long run builds endurance.", longRun: true },
  rest:   { fitness: 0, fatigue: -3, energy: +3, msg: "Rest day restores energy." }
};
