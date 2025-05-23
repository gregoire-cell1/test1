/* ===================================================
   Navigation et changement de pages
=================================================== */
const navLinks = document.querySelectorAll('.nav-link, .btn-main, .scroll-btn');
const sections = document.querySelectorAll('.page-section');

function switchPage(pageId) {
  sections.forEach(section => {
    if (section.id === pageId) {
      // Transition out
      section.style.opacity = 0;
      setTimeout(() => {
        section.classList.add('active-section');
        section.style.opacity = 1; // Transition in
        section.style.transition = "opacity 0.5s ease";
        if (pageId === "formations") renderCards();
      }, 300);
    } else {
      section.classList.remove('active-section');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === pageId);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    if (targetPage) {
      switchPage(targetPage);
      document.getElementById(targetPage).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===================================================
   Données et affichage des formations
   (Incluant des modales détaillées pour chaque formation)
=================================================== */
const formations = [
  {
    nom: "BUT Informatique",
    etablissement: "IUT de Paris - Rives de Seine",
    ville: "Paris",
    transport: "Métro 6 - Quai de la Gare",
    duree: "3 ans",
    diplome: "BUT",
    debouches: "Développeur, Data Analyst, poursuite en Master",
    cout: "170€ / an",
    parcoursup: "Oui",
    emploi_du_temps: [
      "Lundi : Algorithmique",
      "Mardi : Base de données",
      "Mercredi : Développement Web",
      "Jeudi : Projet tutoré",
      "Vendredi : Anglais"
    ],
    satisfaction: 4.5,
    description: "Vie étudiante riche, nombreux projets collaboratifs et stages réguliers.",
    etudiants: [
      {
        nom: "Emma",
        age: 20,
        domaine: "Développement Web",
        bio: "Passionnée de code et de technologie, Emma travaille sur des projets innovants et partage ses astuces.",
        email: "emma@example.com"
      },
      {
        nom: "Lucas",
        age: 21,
        domaine: "Data Science",
        bio: "Lucas transforme des données en histoires captivantes, toujours à l'affût des dernières technologies.",
        email: "lucas@example.com"
      },
      {
        nom: "Sarah",
        age: 19,
        domaine: "UI/UX",
        bio: "Sarah allie créativité et technicité pour concevoir des interfaces intuitives et esthétiques.",
        email: "sarah@example.com"
      }
    ]
  },
  {
    nom: "Licence Psychologie",
    etablissement: "Université Lyon 2",
    ville: "Lyon",
    transport: "Tram T1 - Quai Claude Bernard",
    duree: "3 ans",
    diplome: "Licence",
    debouches: "Psychologue, RH, poursuite en Master",
    cout: "170€ / an",
    parcoursup: "Oui",
    emploi_du_temps: [
      "Lundi : Méthodologie",
      "Mardi : TD de psychologie",
      "Jeudi : Statistiques",
      "Vendredi : Cours magistral"
    ],
    satisfaction: 3.9,
    description: "Association dynamique avec un équilibre parfait entre théorie et pratique.",
    etudiants: [
      {
        nom: "Chloé",
        age: 20,
        domaine: "Psychologie Cognitive",
        bio: "Chloé se passionne pour l'étude des comportements humains et l'impact social.",
        email: "chloe@example.com"
      },
      {
        nom: "Yanis",
        age: 22,
        domaine: "Psychologie Sociale",
        bio: "Yanis analyse les interactions humaines et travaille sur des projets de recherche innovants.",
        email: "yanis@example.com"
      }
    ]
  },
  {
    nom: "BTS Commerce International",
    etablissement: "Lycée Jean Monnet",
    ville: "Marseille",
    transport: "Bus Lignes 15, 22",
    duree: "2 ans",
    diplome: "BTS",
    debouches: "Commercial export, chargé de clientèle, poursuite en licence pro",
    cout: "250€ / an",
    parcoursup: "Oui",
    emploi_du_temps: [
      "Lundi : Économie internationale",
      "Mardi : Techniques de vente",
      "Mercredi : Langues étrangères",
      "Jeudi : Projet d'entreprise",
      "Vendredi : Stage en entreprise"
    ],
    satisfaction: 4.2,
    description: "Formation professionnalisante avec une forte dimension internationale.",
    etudiants: [
      {
        nom: "Marc",
        age: 21,
        domaine: "Commerce",
        bio: "Marc excelle dans les négociations multiculturelles et aime relever les défis internationaux.",
        email: "marc@example.com"
      },
      {
        nom: "Léa",
        age: 20,
        domaine: "Marketing International",
        bio: "Léa combine sens aigu du commerce et créativité pour élaborer des stratégies globales.",
        email: "lea@example.com"
      },
      {
        nom: "Théo",
        age: 22,
        domaine: "Gestion Export",
        bio: "Théo optimise les flux commerciaux et s’engage sur des projets de développement à l'international.",
        email: "theo@example.com"
      }
    ]
  }
  // Ajoute d'autres formations au besoin...
];

const container = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");

/* Créer une carte formation avec bouton "Contacter un étudiant" */
function createCard(formation) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Ajout d'animation initiale
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";

  card.innerHTML = `
    <h2>${formation.nom}</h2>
    <p><strong>Établissement :</strong> ${formation.etablissement}</p>
    <p><strong>Ville :</strong> ${formation.ville} <em>(${formation.transport})</em></p>
    <p><strong>Durée :</strong> ${formation.duree}</p>
    <p><strong>Diplôme :</strong> ${formation.diplome}</p>
    <p><strong>Débouchés :</strong> ${formation.debouches}</p>
    <p><strong>Coût :</strong> ${formation.cout}</p>
    <p><strong>Parcoursup :</strong> ${formation.parcoursup}</p>
    <p><strong>Emploi du temps :</strong></p>
    <ul>${formation.emploi_du_temps.map(j => `<li>${j}</li>`).join("")}</ul>
    <p><strong>Note de satisfaction :</strong> ⭐ ${formation.satisfaction}/5</p>
    <p><strong>Vie étudiante :</strong> ${formation.description}</p>
    <button class="contact-btn" data-students='${JSON.stringify(formation.etudiants)}'>Contacter un étudiant</button>
  `;
  container.appendChild(card);

  // Animation d'apparition
  setTimeout(() => {
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
    card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  }, 100);
}

function renderCards() {
  container.innerHTML = "";
  formations.forEach(createCard);
}

/* Recherche instantanée dans le catalogue */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  container.innerHTML = "";
  formations.filter(f => f.nom.toLowerCase().includes(query))
            .forEach(createCard);
});

/* ===================================================
   Gestion de la modale "Contacter un étudiant"
   (Affichage détaillé des infos par formation)
=================================================== */
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");

function openModal(etudiants) {
  let html = "";
  etudiants.forEach(etud => {
    html += `
      <div class="student-info">
        <h4>${etud.nom} (${etud.age} ans)</h4>
        <p><strong>Domaine :</strong> ${etud.domaine}</p>
        <p>${etud.bio}</p>
        <p><strong>Email :</strong> <a href="mailto:${etud.email}">${etud.email}</a></p>
      </div>
    `;
  });
  modalBody.innerHTML = html;
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

modalClose.addEventListener("click", closeModal);
window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("contact-btn")) {
    const etudiants = JSON.parse(e.target.getAttribute("data-students"));
    openModal(etudiants);
  }
});

/* ===================================================
   Gestion du formulaire de contact
   (Affichage de confirmation après envoi)
=================================================== */
const contactForm = document.getElementById("contactForm");
const contactConfirmation = document.getElementById("contactConfirmation");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  // Simule l'envoi (vous pouvez ajouter ici une requête AJAX)
  setTimeout(() => {
    contactForm.reset();
    contactConfirmation.classList.remove("hidden");
    setTimeout(() => {
      contactConfirmation.classList.add("hidden");
    }, 3000);
  }, 800);
});

/* ===================================================
   Initialisation
=================================================== */
document.addEventListener("DOMContentLoaded", () => {
  switchPage("home");
  if (document.getElementById("formations").classList.contains("active-section")) {
    renderCards();
  }
});
