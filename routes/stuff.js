// Implementation du routeur
const express = require("express");
// Creation du router
const router = express.Router();
// Import du controleur stuff
const stuffCtrl = require("../controllers/stuff");

// Routes utilisant l'import de stuff controller
router.post("/", stuffCtrl.createThing);
router.get("/", stuffCtrl.getAllStuff);
router.post("/", stuffCtrl.createThing);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);

module.exports = router;
