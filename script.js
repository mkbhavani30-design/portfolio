// Theme toggle (remembers choice)
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById("theme")?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const menu = document.getElementById("menu");
const list = document.getElementById("nav-list");
menu?.addEventListener("click", () => {
  const open = list.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});

// Rotating role on home page
const role = document.getElementById("role");
if (role) {
  const roles = ["web developer", "UI designer", "problem solver"];
  let i = 0;
  setInterval(() => { i = (i + 1) % roles.length; role.textContent = roles[i]; }, 2200);
}

// Skill bars animate in on about page
document.querySelectorAll(".fill").forEach(el => {
  requestAnimationFrame(() => { el.style.width = el.dataset.level + "%"; });
});

// Project filters
const buttons = document.querySelectorAll(".filters button");
buttons.forEach(btn => btn.addEventListener("click", () => {
  buttons.forEach(b => { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
  btn.classList.add("on"); btn.setAttribute("aria-pressed", "true");
  document.querySelectorAll("[data-type]").forEach(card => {
    card.hidden = !(btn.dataset.filter === "all" || card.dataset.type === btn.dataset.filter);
  });
}));

// Contact form validation
const form = document.getElementById("contact-form");
form?.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  const rules = {
    name: v => v.trim().length >= 2 || "Enter your name.",
    email: v => /^\S+@\S+\.\S+$/.test(v) || "Enter a valid email address.",
    message: v => v.trim().length >= 10 || "Write at least 10 characters."
  };
  for (const [id, rule] of Object.entries(rules)) {
    const res = rule(form.elements[id].value);
    form.querySelector(`[data-for="${id}"]`).textContent = res === true ? "" : res;
    if (res !== true) ok = false;
  }
  document.getElementById("status").textContent = ok
    ? "Thanks! Your message is ready to send (connect a form service to deliver it)." : "";
  if (ok) form.reset();
});
