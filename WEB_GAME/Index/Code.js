const videos = [
  "Video/1..mp4",
  "Video/2..mp4",
  "Video/3..mp4",
  "Video/4..mp4",
  "Video/5..mp4",
  "Video/6..mp4",
  "Video/7..mp4",
];

let index = 0;
const videoCurrent = document.getElementById("videoCurrent");
const videoNext = document.getElementById("videoNext");
const dots = document.getElementById("dots");

/* dots */
videos.forEach((_, i) => {
  const d = document.createElement("div");
  d.className = "dot";
  d.onclick = () => slideTo(i);
  dots.appendChild(d);
});

function updateDots() {
  [...dots.children].forEach((d, i) =>
    d.classList.toggle("active", i === index)
  );
}

/* slide core */
function slideTo(newIndex, dir = "right") {
  if (newIndex === index) return;

  videoNext.src = videos[newIndex];
  videoNext.play();

  videoNext.className = dir === "right" ? "enter-right" : "enter-left";
  videoCurrent.className = "active";

  requestAnimationFrame(() => {
    videoNext.classList.add("active");
    videoCurrent.className =
      dir === "right" ? "exit-left" : "exit-right";
  });

  setTimeout(() => {
    videoCurrent.src = videoNext.src;
    videoCurrent.play();
    videoCurrent.className = "active";
    videoNext.className = "";
    index = newIndex;
    updateDots();
  }, 500);
}

/* controls */
function nextVideo() {
  slideTo((index + 1) % videos.length, "right");
}

function previousVideo() {
  slideTo((index - 1 + videos.length) % videos.length, "left");
}

/* init */
videoCurrent.src = videos[index];
videoCurrent.play();
updateDots();

document.getElementById("btnNext").onclick = nextVideo;
document.getElementById("btnBack").onclick = previousVideo;
videoCurrent.onended = nextVideo;

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    function offsetBody() {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + "px";
    }

    offsetBody();
    window.addEventListener("resize", offsetBody);
});

