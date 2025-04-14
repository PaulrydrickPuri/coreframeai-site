const endTime = new Date("2025-04-18T09:00:00+08:00").getTime(); // MYT

const overlay = document.getElementById("countdown-overlay");
const timer = document.getElementById("timer");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance <= 0) {
    document.getElementById("typeSound").play();
    overlay.style.transition = "opacity 2s ease-in";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    setTimeout(() => overlay.style.display = "none", 2000);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timer.innerHTML = `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Run immediately
