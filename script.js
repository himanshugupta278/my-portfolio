 // JS for navigation and section content reveal with fade effect

    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("section.page-section")];
    const moreAboutBtn = document.getElementById("moreAboutBtn");

    function showSection(idToShow) {
      sections.forEach(section => {
        if (section.id === idToShow) {
          section.classList.add("active");
          section.tabIndex = 0;
          section.focus({preventScroll: true});
        } else {
          section.classList.remove("active");
          section.tabIndex = -1;
        }
      });
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${idToShow}`) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });
    }

    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        showSection(targetId);
      });
    });

    moreAboutBtn.addEventListener("click", () => {
      showSection("about");
    });

    // Accessibility: allow keyboard navigation for nav links
    document.addEventListener("keydown", e => {
      const activeIndex = navLinks.findIndex(link => link.classList.contains("active"));
      if (e.key === "ArrowDown") {
        e.preventDefault();
        let nextIndex = (activeIndex + 1) % navLinks.length;
        navLinks[nextIndex].focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        let prevIndex = (activeIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[prevIndex].focus();
      }
    });