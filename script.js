var TESTIMONIALS = new Array();
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function onScroll() {
  var bar = document.querySelector(".progress");
  var toTop = document.querySelector(".to-top");
  var scrolled = window.scrollY;
  var height = document.documentElement.scrollHeight - window.innerHeight;
  var progress = height > 0 ? (scrolled / height) * 100 : 0;
  if (bar) bar.style.width = progress + "%";
  if (toTop) toTop.hidden = !(scrolled > window.innerHeight * 0.9);
}

var frame = 0;
window.addEventListener("scroll", function () {
  if (frame) return;
  frame = requestAnimationFrame(function () {
    onScroll();
    frame = 0;
  });
}, { passive: true });
onScroll();

var toTopBtn = document.querySelector(".to-top");
if (toTopBtn) {
  toTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

document.addEventListener("keydown", function (event) {
  var btn = event.target && event.target.closest ? event.target.closest(".acc-btn") : null;
  if (!btn) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  btn.click();
});

document.querySelectorAll(".exclusive .acc-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var group = btn.closest(".exclusive");
    var open = btn.classList.contains("is-open");
    if (group) {
      group.querySelectorAll(".acc-btn").forEach(function (other) {
        other.classList.remove("is-open");
        other.setAttribute("aria-expanded", "false");
      });
    }
    if (!open) {
      btn.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

if (TESTIMONIALS.length) {
  var host = document.querySelector("#testimonial-host");
  if (host) {
    host.hidden = false;
    var html = "<p class='label'>Client</p>";
    TESTIMONIALS.forEach(function (item) {
      html += "<article class='card'><p>" + item.quote + "</p><p><strong>" + item.name + "</strong> " + item.role + "</p></article>";
    });
    host.innerHTML = html;
  }
}
