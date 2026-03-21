Portfolio-architecte-sophie-bluel

Code du projet 6 d'intégrateur web.

📌 Description

Ce projet consiste à créer le portfolio d’une architecte d’intérieur (Sophie Bluel).

L’objectif est de développer un site dynamique en JavaScript permettant :

d’afficher les projets depuis une API
de filtrer les projets par catégorie
de gérer un système de connexion admin
de modifier les projets (ajout / suppression) via une modale
🧱 Architecture

Ce repo git contient les 2 briques logicielles du projet :

Frontend → interface utilisateur (HTML, CSS, JavaScript)
Backend → API pour gérer les données
🚀 Pour lancer le projet
🔧 Backend

Ouvrir le dossier Backend et lire le README.md

Ensuite :

installer les dépendances (npm install)
lancer le serveur (npm start)
💻 Frontend

Ouvrir le dossier Frontend

Puis :

lancer Live Server depuis votre IDE
ouvrir le fichier index.html
⚙️ Fonctionnalités principales
Affichage dynamique des travaux
Filtres par catégories
Connexion administrateur
Mode édition
Ouverture d’une modale
Suppression de projets
Ajout de nouveaux projets (upload image + formulaire)
🔐 Authentification

Une page de login permet d’accéder au mode édition.
Un token est récupéré et stocké pour autoriser les actions (ajout / suppression).

💡 Astuce

Si vous désirez afficher le code du backend et du frontend, faites-le dans 2 instances de VSCode différentes pour éviter tout problème
