const db = require("../models");
const menuitemdb = db.menuitems;


exports.create = (req,res) => {
 // Validate request
 if (!req.body.m_id) {
    res.status(400).send({ message: "Menuitem Title Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const menuItem = new menuitemdb({
    m_id: req.body.m_id,
    short_name: req.body.short_name,
    name: req.body.name,
    description: req.body.description,
    price_small: req.body.price_small,
    price_large: req.body.price_large,
    small_portion_name: req.body.small_portion_name,
    large_portion_name: req.body.large_portion_name
  });

  // Save Tutorial in the database
  menuItem
    .save(menuItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findByCategory = (req, res) => {
  const category = req.query.category;

  //var text = 'John Test''
 // db.collectionName.find();  
 // var condition = category ? { short_name: { $regex: new RegExp(short_name), $options: "i" } } : {};
 var condition = category ? { short_name: { $regex: new RegExp(category), $options: "i" } } : {};


  menuitemdb.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;

    
   var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  

    menuitemdb.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.findOne = (req,res) => {
    const m_id = req.params.id;

    var condition = m_id ? { m_id: { $regex: new RegExp(m_id), $options: "i" } } : {};
  
    menuitemdb.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      menuitemdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    menuitemdb.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    menuitemdb.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.findAllVisible = (req, res) => {
    menuitemdb.find({ menuitemvisible: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
