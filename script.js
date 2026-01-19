// FAQ Accordion
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)";
      navbar.style.boxShadow = "none";
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const menuOverlay = document.querySelector(".menu-overlay");

  const closeMenu = () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    navLinks.classList.add("active");
    mobileMenuBtn.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open");
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking overlay
    if (menuOverlay) {
      menuOverlay.addEventListener("click", closeMenu);
    }

    // Close menu on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-block, .testimonial-card, .stat-item, .faq-item",
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Counter animation for stats
  const statNumbers = document.querySelectorAll(".stat-item h3");

  const animateCounter = (element) => {
    const text = element.textContent;
    const hasPlus = text.includes("+");
    const hasK = text.includes("K");
    const hasM = text.includes("M");
    const hasDot = text.includes(".");

    let endValue;
    if (hasK) {
      endValue = parseFloat(text) * 1000;
    } else if (hasM) {
      endValue = parseFloat(text) * 1000000;
    } else {
      endValue = parseFloat(text);
    }

    let startValue = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      let currentValue = startValue + (endValue - startValue) * easeOutQuart;

      if (hasM) {
        element.textContent =
          (currentValue / 1000000).toFixed(0) + "M" + (hasPlus ? "+" : "");
      } else if (hasK) {
        element.textContent =
          (currentValue / 1000).toFixed(0) + "K" + (hasPlus ? "+" : "");
      } else if (hasDot) {
        element.textContent = currentValue.toFixed(1);
      } else {
        element.textContent = Math.floor(currentValue) + (hasPlus ? "+" : "");
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((stat) => statsObserver.observe(stat));
});
