/* Starlight Yarnovate — shared interactions (vanilla, minimal) */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav */
  var menuBtn = document.querySelector("[data-menu-btn]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        mobileNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  /* Restrained reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Gallery lightbox */
  var dialog = document.querySelector("[data-lightbox]");
  if (dialog && typeof dialog.showModal === "function") {
    var lbImg = dialog.querySelector("[data-lb-img]");
    var lbCap = dialog.querySelector("[data-lb-cap]");
    document.querySelectorAll("[data-lb-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        if (!img) return;
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = btn.dataset.caption || img.alt;
        dialog.showModal();
        dialog.querySelector("[data-lb-close]").focus();
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
    dialog.querySelector("[data-lb-close]").addEventListener("click", function () {
      dialog.close();
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  /* Enquiry form — validates locally, opens the visitor's email app (no backend) */
  var form = document.querySelector("[data-enquiry-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    form.setAttribute("novalidate", "novalidate");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstError = null;
      var emailInput = form.querySelector("#f-email");
      var phoneInput = form.querySelector("#f-phone");
      var emailVal = emailInput ? emailInput.value.trim() : "";
      var phoneVal = phoneInput ? phoneInput.value.trim() : "";
      var emailOk = emailVal !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      var phoneOk = phoneVal !== "" && /^[+\d][\d\s\-().]{5,19}$/.test(phoneVal);
      form.querySelectorAll("[data-field]").forEach(function (wrap) {
        var input = wrap.querySelector("input, textarea, select");
        if (!input) return;
        var valid = true;
        if (input.id === "f-email") valid = emailOk;
        else if (input.id === "f-phone") valid = phoneOk;
        else if (input.hasAttribute("required") && !input.value.trim()) valid = false;
        else if (valid && input.type === "email" && input.value) {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        wrap.classList.toggle("invalid", !valid);
        input.setAttribute("aria-invalid", valid ? "false" : "true");
        if (!valid && !firstError) firstError = input;
      });
      /* Either email or phone is enough — clear both errors when one is valid */
      if (emailOk || phoneOk) {
        if (emailOk && emailInput) {
          emailInput.closest("[data-field]").classList.remove("invalid");
          emailInput.setAttribute("aria-invalid", "false");
        }
        if (phoneOk && phoneInput) {
          phoneInput.closest("[data-field]").classList.remove("invalid");
          phoneInput.setAttribute("aria-invalid", "false");
        }
        if (firstError && (firstError.id === "f-email" || firstError.id === "f-phone")) {
          firstError = form.querySelector(".field.invalid input, .field.invalid textarea");
        }
      } else {
        status.textContent = "Please provide either a valid email address or a phone number.";
        if (emailInput) emailInput.focus();
        return;
      }
      if (firstError) {
        status.textContent = "Please complete the highlighted fields, then try again.";
        firstError.focus();
        return;
      }
      var name = form.querySelector("#f-name").value.trim();
      var email = emailInput ? emailInput.value.trim() : "";
      var phone = phoneInput ? phoneInput.value.trim() : "";
      var level = form.querySelector("#f-level").value;
      var msg = form.querySelector("#f-msg").value.trim();
      var subject = encodeURIComponent("Class enquiry from " + name);
      var body = encodeURIComponent("Name: " + name + "\nEmail: " + (email || "—") + "\nPhone: " + (phone || "—") + "\nExperience: " + level + "\n\n" + msg);
      status.textContent = "Opening your email app…";
      window.location.href = "mailto:starlightyarnovate@gmail.com?subject=" + subject + "&body=" + body;
      form.querySelector("[data-submit]").disabled = false;
    });
  }

  /* Footer year, locale-aware */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    try {
      yearEl.textContent = new Intl.DateTimeFormat(undefined, { year: "numeric" }).format(new Date());
    } catch (err) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
})();
