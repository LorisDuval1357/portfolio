document.addEventListener("DOMContentLoaded", () => {
  
  /* =========================================
     1. LOGIQUE DES CAROUSELS
     ========================================= */
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll("img, video, .carousel-inner > a > img");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    if (slides.length === 0) return;

    let current = 0;

    if (dotsContainer && dotsContainer.innerHTML === "") {
        slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
        });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];

    function updateCarousel() {
      slides.forEach((slide, i) => {
        const isActive = i === current;
        
        if (slide.parentElement.tagName === 'A') {
            slide.parentElement.classList.toggle("active", isActive);
            slide.classList.toggle("active", isActive);
        } else {
            slide.classList.toggle("active", isActive);
        }
        
        if (dots.length > i) {
            dots[i].classList.toggle("active", isActive);
        }

        if (slide.tagName === "VIDEO") {
          if (!isActive) {
            slide.pause();
            slide.currentTime = 0;
          }
        }
      });
    }

    function goToSlide(index) {
      current = index;
      updateCarousel();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        updateCarousel();
      });
    }

    updateCarousel();
  });


  /* =========================================
     2. DONNÉES DES DESCRIPTIONS
     ========================================= */
  const sections = {
    graph: [
      "Carte de visite face recto : Projet Fanch’burgers.",
      "Carte de visite face verso : Suite du projet Fanch’burgers.",
      "Création artistique d'un logo : Marque fictive Loris Parfume.",
      "Montage graphique Sephora : Publicité pour Sephora.",
      "Bozzy le Clown : Mascotte pour Le Rire Médecin.",
      "Elbeuf - Au fil du Temps : Logo pour une exposition immersive."
    ],
    dev: [
      "Site Foodtruck : Thème Super Smash Bros. (Attention ne fonctionne pas sur mobile)",
      "Page de connexion : Interface PHP/MySQL.",
      "Liste des événements : Gestion du panier et réservations.",
      "Interface Administrateur : Back-office de gestion."
    ]
  };


  /* =========================================
     3. LOGIQUE DE LA MODALE
     ========================================= */
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const closeButton = document.querySelector(".close-button");
  const descriptionButtons = document.querySelectorAll(".description-btn");

  if (modal && descriptionButtons.length > 0) {
    descriptionButtons.forEach(button => {
      button.addEventListener("click", () => {
        const sectionId = button.dataset.section;
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;

        const carouselInner = sectionElement.querySelector(".carousel-inner");
        const activeSlide = carouselInner.querySelector(".active");
        
        const allSlides = carouselInner.querySelectorAll("img, video");
        let index = -1;
        allSlides.forEach((slide, i) => {
            if (slide === activeSlide || slide.parentElement === activeSlide) {
                index = i;
            }
        });

        const description = (sections[sectionId] && sections[sectionId][index]) 
                            ? sections[sectionId][index] 
                            : "Description indisponible.";

        modalText.textContent = description;
        modal.classList.remove("hidden");
      });
    });

    if (closeButton) {
        closeButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }


  /* =========================================
     4. MENU MAGIC LINE (SCROLL SPY FIXÉ)
     ========================================= */
  const sectionsSpy = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const marker = document.getElementById("marker");

  function moveMarker(element) {
    if (!marker || !element) {
        if (marker) marker.style.opacity = "0";
        return;
    }
    marker.style.left = element.offsetLeft + "px";
    marker.style.width = element.offsetWidth + "px";
    marker.style.opacity = "1";
  }

  const observerSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // On retire la classe active des autres liens
        navLinks.forEach(link => link.classList.remove("active-link"));

        const id = entry.target.getAttribute("id");
        if (id) {
            const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active-link");
                if(window.innerWidth > 991) moveMarker(activeLink);
            }
        }
      }
    });
  }, {
    // REGLAGE ZONE HAUTE :
    // -15% : On ignore le header
    // -60% : On ignore tout le bas de l'écran
    // La zone de détection est une bande située entre 15% et 40% du haut de l'écran.
    rootMargin: "-15% 0px -60% 0px",
    threshold: 0
  });

  sectionsSpy.forEach(section => {
    observerSpy.observe(section);
  });

  navLinks.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
      if(window.innerWidth > 991) moveMarker(e.target);
    });
  });

  const navContent = document.querySelector(".navbar-nav");
  if (navContent) {
      navContent.addEventListener("mouseleave", () => {
        const activeLink = document.querySelector(".navbar-nav .nav-link.active-link");
        if(window.innerWidth > 991) moveMarker(activeLink);
      });
  }

  window.addEventListener('resize', () => {
      if (window.innerWidth <= 991 && marker) {
          marker.style.opacity = '0';
      }
  });


  /* =========================================
     5. FERMETURE AUTO DU MENU BURGER
     ========================================= */
  const navbarCollapse = document.getElementById("navbarNav");
  const navLinksMobile = document.querySelectorAll(".navbar-nav .nav-link, #download-button");
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

  navLinksMobile.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

});