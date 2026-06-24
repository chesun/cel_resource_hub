// Play `.md-video` demo clips only while they're scrolled into view; pause when
// they leave. Click the video to toggle play/pause (it has no native controls).
function setupScrollVideos() {
  var vids = document.querySelectorAll("figure.md-video video");
  if (!vids.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.play().catch(function () {});
      } else {
        e.target.pause();
      }
    });
  }, { threshold: 0.4 });

  vids.forEach(function (v) {
    if (v.dataset.scrollInit) return;          // bind once per element
    v.dataset.scrollInit = "1";
    v.addEventListener("click", function () {
      if (v.paused) { v.play().catch(function () {}); } else { v.pause(); }
    });
    io.observe(v);
  });
}

if (typeof document$ !== "undefined") {
  document$.subscribe(setupScrollVideos);       // re-run on Material instant nav
} else {
  document.addEventListener("DOMContentLoaded", setupScrollVideos);
}
