// -------------------- Helpers --------------------
export function formatPace(pace) {
  let minutes = Math.floor(pace);
  let seconds = Math.round((pace - minutes) * 60);
  if (seconds === 60) { minutes++; seconds = 0; }
  return `${minutes}:${seconds.toString().padStart(2,"0")} min/mi`;
}

export function formatTime(totalMinutes) {
  let h = Math.floor(totalMinutes / 60);
  let m = Math.floor(totalMinutes % 60);
  let s = Math.floor((totalMinutes * 60) % 60);
  return h > 0 ? `${h}h ${m}m ${s}s` : `${m}:${s.toString().padStart(2,"0")}`;
}

export function classifyVO2(vo2) {
  if (vo2 < 30) return "Poor";
  if (vo2 < 39) return "Fair";
  if (vo2 < 49) return "Good";
  if (vo2 < 56) return "Excellent";
  return "Elite";
}

export function setMetric(barId, valId, value, max, color) {
  let percent = Math.max(0, Math.min(100, (value / max) * 100));
  let bar = document.getElementById(barId);
  bar.style.width = percent + "%";
  bar.style.background = color;
  bar.innerText = value.toFixed(1);
  document.getElementById(valId).innerText = value.toFixed(1);
}

export function setFatigueBar(value) {
  let max = 30;
  let percent = Math.max(0, Math.min(100, (value / max) * 100));
  let bar = document.getElementById("fatigueBar");
  if (value < 10) bar.style.background = "green";
  else if (value < 20) bar.style.background = "orange";
  else bar.style.background = "red";
  bar.style.width = percent + "%";
  bar.innerText = value.toFixed(0);
  document.getElementById("fatigueVal").innerText = value.toFixed(0);
}

import { day, week, month } from './state.js';

export function advanceDay() {
  day++;
  if (day > 7) { day = 1; week++; }
  if (week > 4) { week = 1; month++; }
  updateCareer();
}

export function updateCareer() {
  document.getElementById("career").innerText =
    `Day ${day}, Week ${week}, Month ${month}`;
}

import { pbs } from './state.js';
export function updatePBs(formatTimeFn = formatTime) {
  document.getElementById("pb5k").innerText   = pbs["5k"]   ? formatTimeFn(pbs["5k"])   : "--";
  document.getElementById("pb10k").innerText  = pbs["10k"]  ? formatTimeFn(pbs["10k"])  : "--";
  document.getElementById("pbHalf").innerText = pbs["half"] ? formatTimeFn(pbs["half"]) : "--";
  document.getElementById("pbFull").innerText = pbs["full"] ? formatTimeFn(pbs["full"]) : "--";
}
