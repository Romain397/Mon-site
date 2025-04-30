// script.js

// Sélectionne l'élément HTML avec l'ID "posts-container"
// C'est ici que les articles seront affichés dans la page
const postsContainer = document.getElementById("posts-container");

// Utilisation de la fonction fetch() pour récupérer les données depuis une API
// L'URL utilisée est celle de JSONPlaceholder pour obtenir une liste d'articles fictifs
fetch("https://jsonplaceholder.typicode.com/posts")
  // Lorsque la réponse est reçue, on la convertit en format JSON (objet JavaScript)
  .then((response) => response.json())

  // Une fois les données JSON prêtes, on les traite
  .then((data) => {
    // data est un tableau contenant les articles (100 objets)
    // On parcourt chaque objet avec forEach
    data.forEach((post) => {
      // Création d'une nouvelle <div> pour contenir un article
      const postElement = document.createElement("div");

      // Ajout de la classe CSS "post" à la div pour appliquer le style défini dans style.css
      postElement.classList.add("post");

      // On insère du contenu HTML à l'intérieur de la div :
      // - un <h2> pour le titre
      // - un <p> pour le corps du texte
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;

      // On ajoute cette div (contenant un article) dans la div principale (#posts-container)
      postsContainer.appendChild(postElement);
    });
  })

  // En cas d'erreur (ex : pas d'internet, mauvaise URL...), on capture l'erreur ici
  .catch((error) => {
    // Affiche l'erreur dans la console développeur pour aider au débogage
    console.error("Erreur lors du chargement :", error);

    // Affiche un message visible à l'utilisateur dans la page
    postsContainer.innerHTML = "<p>Impossible de charger les articles.</p>";
  });

// Logique du menu burger
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

// Ajoute ou retire la classe "active" aux liens de navigation
burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  burger.classList.toggle("active"); // animation des lignes
});

// Logique de la barre de recherche
// Sélectionne l'élément de la barre de recherche
const searchBar = document.getElementById("search-bar");

// Fonction pour filtrer les articles
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  // Sélectionne tous les éléments de l'article
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector("h2").textContent.toLowerCase();
    const body = post.querySelector("p").textContent.toLowerCase();

    // Vérifie si le titre ou le corps contient le terme recherché
    if (title.includes(searchTerm) || body.includes(searchTerm)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
});

// Validation du formulaire contact (si présent sur la page)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");

    formMessage.innerHTML = "";
    formMessage.style.color = "red";

    if (!name || !email || !message) {
      formMessage.textContent = "Tous les champs sont obligatoires";
      return;
    }

    // Vérification simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = "Veuillez entrer une adresse email valide";
      return;
    }

    // Si tout est bon, message de confirmation (optionnel)
    formMessage.style.color = "green";
    formMessage.textContent = "Message envoyé avec succès !";
  });
}

// Bouton de changement de thème
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Changement du texte du bouton selon le mode
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "Mode clair";
  } else {
    themeToggleBtn.textContent = "Mode sombre";
  }
});
