const Category = require('../../models/category/Category');
const Service = require('../../models/category/Service')

// const get =  (req, res, next) =>{
//     Category.get()
//     .then(category=>res.json(category))
//     .catch(err=>next(err))
// }
const get = async (req, res, next) => {
  try {
    const result = await Category
      .find({})
      .sort('-status -createdAt')
      .select('_id name summary createdAt status')
      .populate('locations', 'name locality latitude longitude phone');

    // console.log(req.admin)
    res.status(200).json({
      error: false,
      category: result,
      email: req.admin.email,
      role: req.admin.role
    })
  } catch (err) {
    next(err)
  }
}

const post = async (req, res, next) => {
  const request = {
    name: req.body.name,
    summary: req.body.summary
  }

  const category = await Service.create(request);
  res.status(200).json({
    error: false,
    message: "Category successfully created",
    category
  });

};

const getById = (req, res, next) => {
  Service.getById(req.params.id)
    .then(category => category ? res.json(category) : res.sendStatus(404))
    .catch(err => next(err));
}

const put = async (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "category content can not be empty"
    });
  }

  const category = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    summary: req.body.summary
  }, {
    new: true
  })

  if (!category) {
    return res.status(404).send();
  }
  res.send(category);
};

const _delete = (req, res, next) => {
  Service._delete(req.params.id)
    .then((category) => res.json(category))
    .catch(err => next(err));
}

const deactivateCategory = async (req, res,  next) => {
  console.log(req.body);
  let status;
  const cat = await Category.findById(req.body.categoryId);
  if(cat.status === 0) status = 1;
  else status = 0;
  try {
    await Category.findByIdAndUpdate(req.body.categoryId, {status: status});
    res.status(200).json({message: "success"})
  } catch(err){
    res.status(400).json({message: "error"})
  }
}

module.exports = {
  get,
  post,
  getById,
  put,
  _delete,
  deactivateCategory
}
