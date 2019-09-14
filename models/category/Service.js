const express = require('express');
const bodyParser = require('body-parser');
const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());
const Category = require('./Category');

const create = async (req) => {
  const object = new Category(req);
  const result = await object.save();
  return result;
}

// const getList  = async()=>{
//     const result  = await  Category.find().populate('locations');
//    return result;
// }

const getById = async (id) => {
  return await Category.findById(id).populate('locations', 'name locality latitude longitude phone');
}


const _delete = async (id) => {
  await Category.findByIdAndUpdate(id, {delete: 1});
}



// const update = async (id,req) =>{
//      const category= await Category.findById(id);
//     Object.assign(category, categoryParam);
//    await category.save();

// Find category and update it with the request body
// Category.findByIdAndUpdate(id, {
//     name: req.body.name,
//     summary: req.body.summary
// }, {new: true})
// .then(category => {
//     if(!category) {
//         return res.status(404).send({
//             message: "category not found with id " + req.params.id
//         });
//     }
//     res.send(category);
// }).catch(err => {
//     if(err.kind === 'ObjectId') {
//         return res.status(404).send({
//             message: "category not found with id " + req.params.id
//         });
//     }
//     return res.status(500).send({
//         message: "Error updating category with id " + req.params.id
//     });
// });
// }

// const _delete = async(id)=>{
//   await  Category.findByIdAndRemove(id)
//   .then(category => {
//     if(!category) {
//         return res.status(404).send({
//             message: "category not found with id " + req.params.id
//         });
//     }
//     res.send({message: "category deleted successfully!"});
// }).catch(err => {
//     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//         return res.status(404).send({
//             message: "category not found with id " + req.params.id
//         });
//     }
//     return res.status(500).send({
//         message: "Could not delete category with id " + req.params.id
//     });
// });
// }


module.exports = {
  create,
  getById,
  _delete
}
