// Avant création du fichier app.js dans backend ligne commande "npm install express" 

// Import express
const express = require('express');

// Creation const express
const app = express();

// ***** Parametrage des requetes (middleware) avec next qui renvoie au prochain middleware *******
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });

// Export const pour etre utiliser pas les autres fichiers du projet
module.exports = app;

