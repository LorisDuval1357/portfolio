document.addEventListener("DOMContentLoaded", () => {
  
  /* =========================================
     1. LOGIQUE DES CAROUSELS
     ========================================= */
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll("img, video, .carousel-inner > a > img");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    const dotsContainer = carousel.querySelector(".carousel-dots") || carousel.parentElement.querySelector(".carousel-dots");

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
      "Voici le premier site web que j'ai eu l'occasion de produire dans le cadre de mes études: un site web pour un Foodtruck fictif sur le thème du jeu vidéo Super Smash Bros. (Attention site web non responsive, il ne fonctionne pas sur mobile)",
      "Voici une page de connexion pour une billeterie: les profils sont stockés dans une base de données. Il y a des profils utilisateurs ainsi que des profils administrateurs.",
      "Voici un accès à une liste d'événements implémentés dans une base de données, ici nous avons l'interface utilisateur qui permet la gestion du panier et des réservations.",
      "Voici l'interface Administrateur de la billeterie: l'administrateur à la possibilité d'ajouter/supprimer des évènements."
    ],
    flowork: [
      "Logo de Flowork, l'application d'accompagnement RSE en entreprise par la gamification.",
      "Page de connexion : l'utilisateur se connecte avec son adresse mail et son mot de passe.",
      "Page d'inscription : création d'un compte rattaché à une entreprise.",
      "Page d'accueil : niveau et progression de l'utilisateur, défis du jour et statistiques de l'entreprise.",
      "Page des défis : défis du jour, de la semaine et du mois (coopératif) avec suivi de la progression.",
      "Classement des employés d'une même entreprise, basé sur les points cumulés.",
      "Classement des entreprises participantes, avec le nombre de points cumulés et de participants actifs.",
      "Vue du classement côté administrateur, avec gestion des profils et des rôles.",
      "Statistiques globales de l'entreprise : niveau, employés inscrits, défis actifs, CO2 économisé et badges obtenus.",
      "Interface Administrateur permettant de gérer les employés et de suivre leur progression.",
      "Page de profil utilisateur : niveau, points, succès récents et gestion du compte."
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