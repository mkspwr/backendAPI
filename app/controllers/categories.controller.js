const db = require("../models");
const categoriesdb = db.categories;

exports.create = (req,res) => {
 // Validate request
 if (!req.body.c_id) {
    res.status(400).send({ message: "Category id Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const category = new categoriesdb({
      c_id: req.body.c_id,
    short_name: req.body.short_name,
    name: req.body.name,
    special_instruction: req.body.special_instruction,
    url: req.body.url
  });

  // Save Tutorial in the database
  category
    .save(category)
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

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    categoriesdb.find(condition)
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

exports.findOne = (req, res) => {
    const c_id = req.params.id;
    var condition = c_id ? { c_id: { $regex: new RegExp(c_id), $options: "i" } } : {};
  
    categoriesdb.find(condition)
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

// exports.findOne = (req,res) => {
//     const id = req.params.id;

//     categoriesdb.findById(id)
//       .then(data => {
//         if (!data)
//           res.status(404).send({ message: "Not found Tutorial with id " + id });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "Error retrieving Tutorial with id=" + id });
//       });
// };

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      categoriesdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

    categoriesdb.findByIdAndRemove(id)
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
    categoriesdb.deleteMany({})
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
    categoriesdb.find({ categoriesvisible: true })
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
