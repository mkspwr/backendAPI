module.exports = app => {
    const menuitem = require("../controllers/menuitem.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", menuitem.create);
  
    // Retrieve all Tutorials
    router.get("/", menuitem.findAll);

    router.get("/id", menuitem.findByshort_name);
  
    // Retrieve all published Tutorials
    router.get("/category", menuitem.findByCategory);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", menuitem.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", menuitem.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", menuitem.delete);
  
    // Create a new Tutorial
    router.delete("/", menuitem.deleteAll);
  
    app.use('/api/menuitems', router);
  };