const Category = require('../../models/category/Category');
const registerService = require('../../models/user/register/service');

const get = async (req, res, next) => {
  const catg = await Category.find({status: 1})
  try {
    const result = await Category
      .find({})
      .select('_id name summary createdAt')
      .populate({path: 'locations'});

    res.status(200).json({
      error: false,
      category: result
    })
  } catch (err) {
    next(err)
  }
}

const userRegistration = async (req, res, next) => {
  console.log(req.body);
  const mobile = req.body.mobile;
  const request = {
    mobile: mobile,
    status: 1
  }
  // let user = await User.findOne({mobile: req.body.mobile});
  // if(user) return res.status(400).json({error: 'user already exists'});
  // console.log(request);

  try {
    const result = await registerService.create(request);
    // console.log(result);
    res.status(200).json({
      flag: 1,
      error: false,
      user: result,
      message: 'user registered'
    })
  } catch (err) {
    // console.log(err)
    res.status(400).json({
      flag: 0,
      error: true,
      user: [],
      message: 'some whiling registering the user.'
    })
  }
}

module.exports = {
  get,
  userRegistration
}
