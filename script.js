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

document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    var name = tab.getAttribute("data-tab");
    document.querySelectorAll(".tab").forEach(function (item) {
      var on = item === tab;
      item.classList.toggle("is-on", on);
      item.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".seg-panel").forEach(function (panel) {
      panel.classList.toggle("is-hidden", panel.id !== "seg-" + name);
    });
  });
});

document.querySelectorAll(".chip").forEach(function (chip) {
  chip.addEventListener("click", function () {
    document.querySelectorAll(".chip").forEach(function (item) {
      item.classList.toggle("is-on", item === chip);
    });
    var note = document.querySelector("#chip-note");
    if (note) note.textContent = chip.getAttribute("data-note");
  });
});

function wireExclusive(selector) {
  document.querySelectorAll(selector).forEach(function (btn) {
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
}

wireExclusive(".exclusive .acc-btn");

document.querySelectorAll(".acc-btn").forEach(function (btn) {
  if (btn.closest(".exclusive")) return;
  btn.addEventListener("click", function () {
    var open = btn.classList.contains("is-open");
    btn.classList.toggle("is-open", !open);
    btn.setAttribute("aria-expanded", open ? "false" : "true");
  });
});

document.querySelectorAll(".case-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var open = btn.classList.contains("is-open");
    btn.classList.toggle("is-open", !open);
    btn.setAttribute("aria-expanded", open ? "false" : "true");
  });
});

if (!reduceMotion) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function (item) {
    if (item.getBoundingClientRect().top < window.innerHeight * 0.92) item.classList.add("in");
    else observer.observe(item);
  });
}

if (TESTIMONIALS.length) {
  var host = document.querySelector("#testimonial-host");
  if (host) {
    host.hidden = false;
    var html = "<p class='idx'>06</p><h2>What people <em>say</em></h2>";
    TESTIMONIALS.forEach(function (item) {
      html += "<article class='card'><p>" + item.quote + "</p><p><strong>" + item.name + "</strong> " + item.role + "</p></article>";
    });
    host.innerHTML = html;
  }
}
