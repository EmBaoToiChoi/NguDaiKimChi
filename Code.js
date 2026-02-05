document.addEventListener("DOMContentLoaded", () => {

  const videos = [
    "./1.mp4",
    "./2.mp4",
    "./3.mp4",
    "./4.mp4",
    "./5.mp4",
    "./6.mp4",
    "./7.mp4",
  ];

  let index = 0;

  const videoCurrent = document.getElementById("videoCurrent");
  const videoNext = document.getElementById("videoNext");
  const dots = document.getElementById("dots");

  if (!videoCurrent || !videoNext || !dots) return;

  videoCurrent.muted = true;
  videoNext.muted = true;

  /* ===== DOTS ===== */
  videos.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot";
    d.onclick = () => slideTo(i, i > index ? "right" : "left");
    dots.appendChild(d);
  });

  function updateDots() {
    [...dots.children].forEach((d, i) =>
      d.classList.toggle("active", i === index)
    );
  }

  /* ===== SLIDE CORE ===== */
  function slideTo(newIndex, dir = "right") {
    if (newIndex === index) return;

    videoNext.pause();
    videoNext.removeAttribute("src");
    videoNext.load();

    videoNext.src = videos[newIndex];

    videoNext.oncanplay = () => {
      videoNext.className = dir === "right" ? "enter-right" : "enter-left";

      requestAnimationFrame(() => {
        videoNext.classList.add("active");
        videoCurrent.className =
          dir === "right" ? "exit-left" : "exit-right";
      });

      videoNext.play().catch(() => {});
    };

    setTimeout(() => {
      videoCurrent.src = videoNext.src;
      videoCurrent.play().catch(() => {});
      videoCurrent.className = "active";
      videoNext.className = "";
      index = newIndex;
      updateDots();
    }, 500);
  }

  /* ===== CONTROLS ===== */
  function nextVideo() {
    slideTo((index + 1) % videos.length, "right");
  }

  function previousVideo() {
    slideTo((index - 1 + videos.length) % videos.length, "left");
  }

  document.getElementById("btnNext").onclick = nextVideo;
  document.getElementById("btnBack").onclick = previousVideo;
  videoCurrent.onended = nextVideo;

  /* ===== INIT ===== */
  videoCurrent.src = videos[index];
  videoCurrent.play().catch(() => {});
  updateDots();

  /* ===== FIX HEADER OFFSET ===== */
  const header = document.querySelector("header");
  function offsetBody() {
    document.body.style.paddingTop = header.offsetHeight + "px";
  }
  offsetBody();
  window.addEventListener("resize", offsetBody);

});
