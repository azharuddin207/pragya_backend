const Register = require('./register');

const create = async (req) => {
  console.log(req);
  const object = new Register(req);
  return await object.save();
}

module.exports = {
  create
}
