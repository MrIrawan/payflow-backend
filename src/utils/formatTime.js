export function formatTime(timeString) {
  const time = new Date(timeString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return time;
}
