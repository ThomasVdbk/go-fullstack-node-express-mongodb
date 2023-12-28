// Avant création du fichier app.js dans backend ligne commande "npm install express" 

// Import express
const express = require('express');
// Creation const express
const app = express();
// Import mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://JohnMcClane:dieHard@cluster0.mwtizxt.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
// ***** Parametrage middleware avec next qui renvoie au prochain middleware *******

// middleware intercepte toutes les requetes contenant du json pour le mettre a dispo de req.body via app.post
app.use(express.json());

// middleware qui envoi vers la bdd
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

// middleware general car pas de route URL
app.get((req, res, next) => {
    //Ces headers permettent :
//accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
//envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// avec URL demander par le front
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
    next();
  });
// Export const pour etre utiliser pas les autres fichiers du projet
module.exports = app;

