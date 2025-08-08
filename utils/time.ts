export function getCurrentTimeMs() {
  const time = Date.now();
  console.log(time);
  return time;
}

export function setTime(min: number, sec: number) {
  const now = Date.now();
  const totalMs = (min * 60 + sec) * 1000;
  return now + totalMs;
}

export function getMinutesSecondsFromMs(ms: number) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds };
}

export function timeDiff(curr: number, future: number) {
  const diffMs = future - curr;
  const totalSec = Math.max(Math.floor(diffMs / 1000), 0);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return { min, sec };
}
