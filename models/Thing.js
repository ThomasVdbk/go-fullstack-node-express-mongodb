// Import mongoose pour utiliser le schema
const mongoose = require('mongoose');

// Creation du schema de donnée pour notre Thing
// required impose d'être utiliser sans quoi le schema n'est pas valide
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// Export du model 
module.exports = mongoose.model('Thing', thingSchema);