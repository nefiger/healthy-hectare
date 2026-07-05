/* Healthy Hectare — site behaviour */

/* ------------------------------------------------------------------
   Lead-capture config (§7a Option A — form → email notification).
   Set FORM_ENDPOINT to a form-handling service URL (e.g. a Formspree
   form endpoint) to activate live submissions. Until it is set, the
   form shows a "not yet connected" notice instead of failing silently.
   See README.md — "Get Involved form" — for setup and the Option B
   upgrade path.
------------------------------------------------------------------- */
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/XXXXXXXX"

(function () {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Get Involved form
  const form = document.getElementById("contact-form");
  if (!form) return;

  const segmentSelect = form.querySelector("#segment");
  const segmentBlocks = form.querySelectorAll(".segment-fields");
  const status = document.getElementById("form-status");

  function showSegmentFields() {
    const val = segmentSelect.value;
    segmentBlocks.forEach((block) => {
      const active = block.dataset.segment === val;
      block.classList.toggle("active", active);
      block.querySelectorAll("input, select, textarea").forEach((f) => {
        f.disabled = !active;
      });
    });
  }

  // Preselect segment from ?segment= query or #hash
  const params = new URLSearchParams(window.location.search);
  const preset = params.get("segment") || window.location.hash.replace("#", "");
  if (preset && segmentSelect.querySelector(`option[value="${preset}"]`)) {
    segmentSelect.value = preset;
  }
  segmentSelect.addEventListener("change", showSegmentFields);
  showSegmentFields();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";

    // Honeypot — silently drop bot submissions
    if (form.querySelector('[name="website"]').value) return;

    if (!FORM_ENDPOINT) {
      status.textContent =
        "This form isn't connected to a delivery service yet — it will be live shortly. " +
        "In the meantime, please reach out through the UnPoison team directly.";
      status.classList.add("err");
      return;
    }

    const data = new FormData(form);
    data.append("submitted_at", new Date().toISOString());

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      form.reset();
      showSegmentFields();
      status.textContent =
        "Thank you — your message has been sent. We'll be in touch.";
      status.classList.add("ok");
    } catch (err) {
      status.textContent =
        "Something went wrong sending your message. Please try again in a moment.";
      status.classList.add("err");
    } finally {
      btn.disabled = false;
    }
  });
})();
