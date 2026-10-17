const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const bar = document.querySelector(".progress");
const toTop = document.querySelector(".to-top");

function onScroll() {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrolled / height) * 100 : 0;
  bar.style.width = progress + "%";
  toTop.hidden = !(scrolled > window.innerHeight * 0.9);
}

let frame = 0;
window.addEventListener(
  "scroll",
  () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      onScroll();
      frame = 0;
    });
  },
  { passive: true }
);

onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

if (!reduceMotion) {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  reveals.forEach((item) => {
    const aboveTheFold = item.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (aboveTheFold) item.classList.add("in");
    else observer.observe(item);
  });
}
