export function formatTime(timeString) {
  const time = new Date(timeString).toLocaleTimeString("en-US");

  return time;
}
