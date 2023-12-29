// Avant création du fichier app.js dans backend ligne commande "npm install express" 

// Import express
const express = require('express');
// Creation const express
const app = express();
// Import mongoose
const mongoose = require('mongoose');
// Import du routeur
const stuffRoutes = require('./routes/stuff');

mongoose.connect('mongodb+srv://JohnMcClane:dieHard@cluster0.mwtizxt.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  // ***** Parametrage middleware avec next qui renvoie au prochain middleware *******
  

  // middleware general car pas de route URL
  app.use((req, res, next) => {
      //Ces headers permettent :
  //accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  //envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });

// middleware intercepte toutes les requetes contenant du json pour le mettre a dispo de req.body via app.post
app.use(express.json());

// Pour cette route là import via stuffRoutes
app.use('/api/stuff', stuffRoutes);
  
// Export const pour etre utiliser pas les autres fichiers du projet
module.exports = app;

