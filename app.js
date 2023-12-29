// Avant création du fichier app.js dans backend ligne commande "npm install express" 

// Import express
const express = require('express');
// Creation const express
const app = express();
// Import mongoose
const mongoose = require('mongoose');
// Import schema donnée
const Thing = require('./models/Thing');


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


// middleware qui envoi vers la bdd en utilisant le schema Thing
app.post('/api/stuff', (req, res, next) => {
  // suppression du champ id genere par mongodb
  delete req.body._id;
  // creation d'un nouveau Thing en copiant le corp de la request avec spread
  const thing = new Thing({
    ...req.body
  });
  // enregistement du thing cree dans la bdd avec Promise (renvoyé par save())
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
    });

// middleware update Thing
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
   });

// middleware delete Thing
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


// avec URL demander par le front pour lecture bdd
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });
// Export const pour etre utiliser pas les autres fichiers du projet
module.exports = app;

