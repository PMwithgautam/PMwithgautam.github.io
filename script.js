/* Replace these before you publish. Leave a value as-is until you have the real one. */
const SITE = {
  booking: "[CAL.COM LINK]",
  prodcon: "[LINK]",
  // Compressed image, for example "images/crackthepm.webp"
  screenshot: "[SCREENSHOT]",
  // Five or six compressed .webp paths. Example: ["images/ugc-1.webp"]
  ads: []
};

const MAILTO = "mailto:gautamkumarsingh104@gmail.com?subject=15-min%20call";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function isUrl(value) {
  return typeof value === "string" && value.startsWith("http");
}

function isImagePath(value) {
  return typeof value === "string" && /\.(webp|jpg|jpeg|png|avif)$/i.test(value);
}

document.querySelectorAll("[data-book]").forEach((link) => {
  if (isUrl(SITE.booking)) {
    link.href = SITE.booking;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else if (!link.getAttribute("href")) {
    link.href = MAILTO;
  }
});

if (isUrl(SITE.booking)) {
  document.querySelectorAll(".booking-note").forEach((note) => note.remove());
}

document.querySelectorAll("[data-prodcon]").forEach((link) => {
  if (isUrl(SITE.prodcon)) {
    link.href = SITE.prodcon;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.querySelectorAll(".placeholder").forEach((flag) => flag.remove());
  } else {
    link.addEventListener("click", (event) => event.preventDefault());
  }
});

const shot = document.querySelector("[data-shot]");
if (shot && isImagePath(SITE.screenshot)) {
  const image = new Image();
  image.alt = "CrackThePM analytics";
  image.width = 1200;
  image.height = 675;
  image.loading = "lazy";
  image.decoding = "async";
  image.onload = () => {
    shot.classList.add("has-image");
    shot.insertBefore(image, shot.firstChild);
  };
  image.src = SITE.screenshot;
}

const adSlots = document.querySelectorAll("[data-ads] .ad-slot");
SITE.ads.forEach((src, index) => {
  const slot = adSlots[index];
  if (!slot || !isImagePath(src)) return;
  const image = new Image();
  image.alt = "AI UGC ad sample " + (index + 1);
  image.width = 720;
  image.height = 900;
  image.loading = "lazy";
  image.decoding = "async";
  image.onload = () => {
    slot.classList.add("has-image");
    slot.appendChild(image);
  };
  image.src = src;
});

const bar = document.querySelector(".progress");
const toTop = document.querySelector(".to-top");

function onScroll() {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrolled / height) * 100 : 0;
  bar.style.width = progress + "%";

  const pastFirstScreen = scrolled > window.innerHeight * 0.9;
  toTop.hidden = !pastFirstScreen;
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
