const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function setupSlider(slidesSelector, dotsSelector, activeClass, delay) {
  const slides = [...document.querySelectorAll(slidesSelector)];
  const dots = [...document.querySelectorAll(dotsSelector)];
  let index = 0;

  function show(nextIndex) {
    index = nextIndex;
    slides.forEach((slide, slideIndex) => slide.classList.toggle(activeClass, slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle(activeClass, dotIndex === index));
  }

  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => show(dotIndex)));
  if (slides.length) {
    setInterval(() => show((index + 1) % slides.length), delay);
  }
}

setupSlider('.welcome-slide', '.welcome-dot', 'active', 5000);

const counted = new WeakSet();
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || counted.has(entry.target)) return;
    counted.add(entry.target);
    const target = Number(entry.target.dataset.counter);
    const duration = 1300;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = Math.round(target * eased).toString() + '+';
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}, { threshold: 0.45 });

document.querySelectorAll('[data-counter]').forEach((counter) => counterObserver.observe(counter));

const hero = document.querySelector('[data-parallax]');
const heroImage = document.querySelector('.hero-image');

hero?.addEventListener('pointermove', (event) => {
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  heroImage.style.transform = `scale(1.045) translate(${x * 12}px, ${y * 10}px)`;
});

hero?.addEventListener('pointerleave', () => {
  heroImage.style.transform = 'scale(1.04)';
});


/* ============================================================
   VVTECH APPROACH — consolidated responsive interaction
   Desktop/tablet auto-rotate; touch/mobile relies on user selection.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  const approach = document.querySelector(".vv-approach");
  if (!approach) return;

  const stages = [...approach.querySelectorAll(".vv-stage")];
  const number = approach.querySelector("#vvSlideNumber");
  const label = approach.querySelector("#vvSlideLabel");
  const title = approach.querySelector("#vvSlideTitle");
  const description = approach.querySelector("#vvSlideDescription");
  const featureGrid = approach.querySelector("#vvFeatureGrid");
  const progress = approach.querySelector("#vvProgress");
  const content = approach.querySelector(".vv-slide-content");
  const prev = approach.querySelector("#vvPrev");
  const next = approach.querySelector("#vvNext");
  if (!stages.length || !number || !label || !title || !description || !featureGrid || !progress || !content || !prev || !next) return;

  const slides = [
    { number: "01", label: "DISCOVER", title: "Discover & Assess", description: "We evaluate your existing IT environment, business objectives, technology dependencies, security risks, performance requirements, and operational challenges to identify priorities and opportunities for improvement.", features: ["Infrastructure Assessment", "Business Alignment", "Risk & Compliance Review", "Performance Analysis", "Security Posture Review", "Technology Dependency Mapping", "Gap Analysis", "Opportunity Identification"] },
    { number: "02", label: "DESIGN", title: "Design a Secure & Scalable Architecture", description: "We develop the architecture, technology roadmap, security model, capacity requirements, and solution design aligned with your business, operational, availability, and long-term growth requirements.", features: ["Solution Architecture", "Network Architecture", "Security Architecture", "Capacity Planning", "High Availability Design", "Technology Selection", "Business Continuity", "Migration Planning"] },
    { number: "03", label: "ENGINEER", title: "Engineer for Performance, Resilience & Security", description: "We turn the architecture into a production-ready solution with detailed configurations, integrations, security controls, performance requirements, and resilience built into the design.", features: ["Technical Engineering", "Infrastructure Configuration", "Security Controls", "System Integration", "Performance Engineering", "High Availability", "Resilience Planning", "Technical Standards"] },
    { number: "04", label: "IMPLEMENT", title: "Deploy & Integrate with Controlled Execution", description: "We implement, configure, migrate, test, and validate the solution with controlled execution designed to minimize operational disruption and maintain business continuity.", features: ["Infrastructure Deployment", "Network Implementation", "Security Configuration", "Server & Storage Setup", "Virtualization Deployment", "Migration & Integration", "Testing & Validation", "Production Handover"] },
    { number: "05", label: "OPTIMIZE", title: "Improve Performance, Capacity & Efficiency", description: "We identify bottlenecks, configuration gaps, capacity constraints, security weaknesses, and operational inefficiencies to improve the performance and effectiveness of your IT environment.", features: ["Performance Optimization", "Capacity Optimization", "Configuration Review", "Resource Optimization", "Network Optimization", "Security Hardening", "Cost Optimization", "Operational Improvement"] },
    { number: "06", label: "MONITOR", title: "Maintain Continuous IT Visibility", description: "We provide continuous visibility across your IT environment through monitoring of availability, performance, capacity, infrastructure health, and security events to identify issues proactively.", features: ["Infrastructure Monitoring", "Network Monitoring", "Server Monitoring", "Application Visibility", "Capacity Monitoring", "Performance Monitoring", "Alert Management", "Availability Tracking"] },
    { number: "07", label: "SUPPORT", title: "Ensure Reliable & Continuous IT Operations", description: "We provide responsive technical support, proactive maintenance, administration, troubleshooting, and incident resolution to maintain service availability, operational stability, and business continuity.", features: ["Technical Support", "System Administration", "Network Administration", "Incident Resolution", "Preventive Maintenance", "Troubleshooting", "Change Management", "Operational Support"] }
  ];

  let current = 0;
  let timer = null;
  const canAutoRotate = window.matchMedia("(hover: hover) and (pointer: fine)");
  const interval = 6000;

  function render(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    content.classList.add("vv-changing");
    window.setTimeout(() => {
      number.textContent = slide.number;
      label.innerHTML = slide.label + " <span></span>";
      title.textContent = slide.title;
      description.textContent = slide.description;
      featureGrid.innerHTML = slide.features.map(item => '<div class="vv-feature"><i></i>' + item + '</div>').join("");
      stages.forEach((stage, i) => {
        stage.classList.toggle("active", i === current);
        stage.setAttribute("aria-current", i === current ? "step" : "false");
      });
      progress.style.width = (((current + 1) / slides.length) * 100) + "%";
      content.classList.remove("vv-changing");
    }, 170);
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    if (!canAutoRotate.matches || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(() => render(current + 1), interval);
  }

  stages.forEach(stage => stage.addEventListener("click", () => {
    render(Number(stage.dataset.slide));
    start();
  }));
  next.addEventListener("click", () => { render(current + 1); start(); });
  prev.addEventListener("click", () => { render(current - 1); start(); });

  approach.addEventListener("mouseenter", stop);
  approach.addEventListener("mouseleave", start);
  approach.addEventListener("focusin", stop);
  approach.addEventListener("focusout", event => {
    if (!approach.contains(event.relatedTarget)) start();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  canAutoRotate.addEventListener?.("change", start);

  render(0);
  start();
});

/* ============================================================
   VVTECH SERVICES — one responsive implementation
   Desktop: auto-rotate + hover/focus pause.
   Touch/mobile: tap-driven, no automatic rotation.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  const showcase = document.querySelector("[data-service-showcase]");
  if (!showcase) return;

  const tabs = Array.from(showcase.querySelectorAll("[data-service-tab]"));
  const panels = Array.from(showcase.querySelectorAll("[data-service-panel]"));
  const progress = showcase.querySelector(".service-progress span");
  if (!tabs.length || !panels.length) return;

  const canAutoRotate = window.matchMedia("(hover: hover) and (pointer: fine)");
  const interval = 5000;
  let current = Math.max(0, tabs.findIndex(tab => tab.classList.contains("active")));
  let timer = null;
  let paused = false;

  function restartProgress() {
    if (!progress) return;
    progress.style.animation = "none";
    void progress.offsetWidth;
    progress.style.animation = "";
  }

  function showService(index) {
    current = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const active = i === current;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel, i) => panel.classList.toggle("active", i === current));
    restartProgress();
  }

  function stopRotation() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function startRotation() {
    stopRotation();
    if (paused || !canAutoRotate.matches || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showcase.classList.add("is-paused");
      return;
    }
    showcase.classList.remove("is-paused");
    timer = window.setInterval(() => showService(current + 1), interval);
  }

  function pauseRotation() {
    paused = true;
    stopRotation();
    showcase.classList.add("is-paused");
  }

  function resumeRotation() {
    paused = false;
    startRotation();
  }

  tabs.forEach((tab, index) => tab.addEventListener("click", () => {
    showService(index);
    if (canAutoRotate.matches) startRotation();
  }));

  if (canAutoRotate.matches) {
    showcase.addEventListener("mouseenter", pauseRotation);
    showcase.addEventListener("mouseleave", resumeRotation);
    showcase.addEventListener("focusin", pauseRotation);
    showcase.addEventListener("focusout", event => {
      if (!showcase.contains(event.relatedTarget)) resumeRotation();
    });
  }

  document.addEventListener("visibilitychange", () => document.hidden ? stopRotation() : startRotation());
  canAutoRotate.addEventListener?.("change", () => { paused = false; startRotation(); });

  showService(current);
  startRotation();
});

/* ============================================================
   VVTECH AI ASSISTANT
   Connects the static website to the existing Cloudflare Worker.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  const VVTECH_AI_ENDPOINT = "https://vvtech-ai.prasanthyalavarthi9.workers.dev/";
  const launcher = document.getElementById("vvtech-ai-launcher");
  const panel = document.getElementById("vvtech-ai-panel");
  const closeBtn = document.getElementById("vvtech-ai-close");
  const form = document.getElementById("vvtech-ai-form");
  const input = document.getElementById("vvtech-ai-input");
  const sendBtn = document.getElementById("vvtech-ai-send");
  const messages = document.getElementById("vvtech-ai-messages");
  const typing = document.getElementById("vvtech-ai-typing");
  const suggestions = document.getElementById("vvtech-ai-suggestions");
  if (!launcher || !panel || !form || !input || !messages || !typing || !suggestions) return;

  let history = [];
  let busy = false;

  function openChat() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    window.setTimeout(() => input.focus(), 80);
  }
  function closeChat() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
  }
  function addMessage(text, role) {
    const wrapper = document.createElement("div");
    wrapper.className = "vvtech-ai-message " + (role === "user" ? "vvtech-ai-user" : "vvtech-ai-bot");
    if (role !== "user") {
      const label = document.createElement("div");
      label.className = "vvtech-ai-message-label";
      label.textContent = "VVTech AI";
      wrapper.appendChild(label);
    }
    const body = document.createElement("div");
    body.className = "vvtech-ai-message-body";
    body.textContent = text;
    wrapper.appendChild(body);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }
  function setBusy(value) {
    busy = value;
    if (sendBtn) sendBtn.disabled = value;
    input.disabled = value;
    typing.hidden = !value;
    if (value) messages.scrollTop = messages.scrollHeight;
  }
  async function sendMessage(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    addMessage(text, "user");
    input.value = "";
    input.style.height = "auto";
    setBusy(true);
    try {
      const response = await fetch(VVTECH_AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(-10) })
      });
      let data = {};
      try { data = await response.json(); } catch (_) {}
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to process the request.");
      const reply = String(data.reply || "").trim();
      if (!reply) throw new Error("The AI returned an empty response.");
      addMessage(reply, "assistant");
      history.push({ role: "user", content: text }, { role: "assistant", content: reply });
      history = history.slice(-10);
    } catch (error) {
      console.error("VVTech AI:", error);
      addMessage("I’m sorry, I’m unable to process your request right now. Please try again or contact VVTech Solutions through the website.", "assistant");
    } finally {
      setBusy(false);
      input.focus();
    }
  }

  launcher.addEventListener("click", () => panel.hidden ? openChat() : closeChat());
  closeBtn?.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); closeChat(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (!panel.hidden) closeChat();
      if (document.body.classList.contains("nav-open")) {
        nav?.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    }
  });
  document.addEventListener("click", event => {
    if (!panel.hidden && !document.getElementById("vvtech-ai-widget")?.contains(event.target)) closeChat();
  });
  panel.addEventListener("click", event => event.stopPropagation());
  form.addEventListener("submit", event => { event.preventDefault(); sendMessage(input.value); });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  input.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 110) + "px";
  });
  suggestions.querySelectorAll("button").forEach(button => button.addEventListener("click", () => sendMessage(button.dataset.question || "")));
});

/* Keep the navigation state correct after rotation/orientation changes. */
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    nav?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
});
