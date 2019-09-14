const User = require("../../models/user/register/register");
const {Admin} = require("../../models/admin");

const getUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json({ message: "success", users }))
    .catch(err => res.status(400).json({ message: "error", users: null }));
};

const getAdmins = (req, res) => {
  Admin.find()
    .then(admins => res.status(200).json({ message: "success", admins, user: req.admin }))
    .catch(err => res.status(400).json({ message: "error", admins: null, user: req.admin }));
};

const deleteAdmin = async (req, res) => {
	try {
		await Admin.deleteOne({_id: req.params.adminId});
		res.status(200).json({message: "success"});
	} catch(err) {
		res.status(400).json({message: "error"});
	}
}

module.exports = {
  getUsers,
  getAdmins,
  deleteAdmin
};
