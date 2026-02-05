document.addEventListener("DOMContentLoaded", () => {

  const videos = [
    "./Video/1.mp4",
    "./Video/2.mp4",
    "./Video/3.mp4",
    "./Video/4.mp4",
    "./Video/5.mp4",
    "./Video/6.mp4",
    "./Video/7.mp4",
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
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.onclick = () => slideTo(i, i > index ? "right" : "left");
    dots.appendChild(dot);
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
  document.getElementById("btnNext").onclick =
    () => slideTo((index + 1) % videos.length, "right");

  document.getElementById("btnBack").onclick =
    () => slideTo((index - 1 + videos.length) % videos.length, "left");

  videoCurrent.onended =
    () => slideTo((index + 1) % videos.length, "right");

  /* ===== INIT ===== */
  videoCurrent.src = videos[index];
  videoCurrent.play().catch(() => {});
  updateDots();

  /* ===== FIX HEADER OFFSET ===== */
  const header = document.querySelector("header");
  const offsetBody = () =>
    document.body.style.paddingTop = header.offsetHeight + "px";

  offsetBody();
  window.addEventListener("resize", offsetBody);
});
