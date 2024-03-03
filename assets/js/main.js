/**
* Template Name: Impact
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

// Fonction pour ouvrir le modal
// Fonction pour ouvrir le modal
function openRareModal(event) {
  // Empêcher le comportement par défaut du lien (qui est de suivre le href)
  event.preventDefault();
  
  // Afficher le modal
  document.getElementById('rareContactModal').style.display = 'block';
}

// Fonction pour fermer le modal
function closeRareModal() {
  document.getElementById('rareContactModal').style.display = 'none';
}

// Fermer le modal lorsqu'on clique sur le bouton de fermeture
document.querySelector('.rare-close').addEventListener('click', closeRareModal);

// Fermer le modal lorsqu'on clique en dehors de celui-ci
window.addEventListener('click', function(event) {
  var modal = document.getElementById('rareContactModal');
  if (event.target == modal) {
    closeRareModal();
  }
});


// Fonction pour vérifier si l'élément est visible à l'écran
function isElementVisible(element) {
  let rect = element.getBoundingClientRect();
  let windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  return (rect.top <= windowHeight * 0.75); // Si le haut de l'élément est visible à 75% dans la fenêtre
}

// Fonction pour afficher les éléments un par un avec l'effet de rebondissement
function showAnimatedItems() {
  let items = document.querySelectorAll('.our-portfolio .item');
  let delay = 0; // Initialiser le délai pour la première animation
  items.forEach(function(item, index) {
      if (isElementVisible(item)) {
          setTimeout(function() {
              item.style.opacity = '1';
              item.classList.add('animated', 'bounceInUp'); // Ajout de classes CSS pour l'animation
          }, delay);
          delay += 400; // Augmenter le délai pour les animations suivantes
      }
  });
}

// Événement de défilement de la fenêtre
window.addEventListener('scroll', function() {
  showAnimatedItems(); // Appeler la fonction pour afficher les éléments animés lorsque l'utilisateur fait défiler la page
});

// Appel initial de la fonction lors du chargement de la page
showAnimatedItems();


// Fonction pour fermer la bannière
function closeBanner() {
  document.getElementById('promoBanner').style.display = 'none';
}

// Date de fin de l'offre (en prenant en compte le décalage horaire)
var endDate = new Date('2024-04-29T23:59:59');
endDate.setHours(23, 59, 59); // Fixer l'heure à 23h 59min 59s

// Mettre à jour la fonction d'affichage du compte à rebours
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = endDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Mettre à jour le HTML du compte à rebours avec des blocs distincts pour chaque élément
  document.getElementById('countdowne').innerHTML = 
    '<div class="countdown-block">' + '<span class="countdown-number">' + days + '</span><br><span class="countdown-unit">jours</span></div>' +
    '<div class="countdown-block">' + '<span class="countdown-number">' + hours + '</span><br><span class="countdown-unit">heures</span></div>' +
    '<div class="countdown-block">' + '<span class="countdown-number">' + minutes + '</span><br><span class="countdown-unit">minutes</span></div>' +
    '<div class="countdown-block">' + '<span class="countdown-number">' + seconds + '</span><br><span class="countdown-unit">secondes</span></div>';

  if (distance < 0) {
    clearInterval(x);
    document.getElementById('countdowne').innerHTML = 'EXPIRED';
  }
}, 1000);


document.getElementById("whatsappLink").addEventListener("click", function(event) {
  event.preventDefault(); // empêcher le comportement de lien par défaut
  
  var phoneNumber = "24107669241"; // numéro de téléphone WhatsApp avec le préfixe international
  var message = "Bonjour, j'aimerais profiter de votre offre de 20% de remise pour réaliser mon projet de site internet.";
  var whatsappURL = "https://wa.me/" + phoneNumber + "/?text=" + encodeURIComponent(message);
  
  // Rediriger l'utilisateur vers WhatsApp
  window.location.href = whatsappURL;
});

document.addEventListener("DOMContentLoaded", function() {
  var portfolioLinks = document.querySelectorAll('[id^="portfolio-link-"]');
  portfolioLinks.forEach(function(link) {
      link.addEventListener("click", function(event) {
          event.preventDefault(); // Empêche le comportement par défaut de l'ancre
          // Vous pouvez ajouter ici le code pour afficher l'élément survolé si nécessaire
      });
  });
});

// Script pour ramener la page a son etat au rfraichissment 
// Enregistrer la position de défilement actuelle
function saveScrollPosition() {
  localStorage.setItem('scrollPosition', window.scrollY);
}

// Restaurer la position de défilement lors du chargement de la page
window.addEventListener('load', function() {
  var scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition !== null) {
      window.scrollTo(0, scrollPosition);
      localStorage.removeItem('scrollPosition'); // Supprimer la position enregistrée une fois restaurée
  }
});

// Enregistrer la position de défilement avant de quitter la page
window.addEventListener('beforeunload', saveScrollPosition);

// cookie 
   // Fonction pour masquer la bannière
   function hideCookieBanner() {
    document.getElementById('cookie-banner').style.display = 'none';
    // Enregistrement de l'acceptation des cookies dans le stockage local
    localStorage.setItem('cookieAccepted', 'true');
}

// Vérification si l'utilisateur a déjà accepté les cookies
if (localStorage.getItem('cookieAccepted') === 'true') {
    // Masquer la bannière si l'utilisateur a déjà accepté les cookies
    document.getElementById('cookie-banner').style.display = 'none';
} else {
    // Afficher la bannière si l'utilisateur n'a pas encore accepté les cookies
    document.getElementById('cookie-banner').style.display = 'block';
}

// Ajouter un écouteur d'événements pour le bouton "OK"
document.getElementById('accept-cookies').addEventListener('click', hideCookieBanner);