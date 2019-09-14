const Location = require('../../models/category/Location');
const Category = require('../../models/category/Category');

//Location api
const createLocation = async (req, res, next) => {
  try {
    let locationArr = [req.body.data.phone1, req.body.data.phone2, req.body.data.phone3];
    const location = new Location({
      name: req.body.data.name,
      locality: req.body.data.locality,
      longitude: req.body.data.longitude,
      latitude: req.body.data.latitude,
      phone: locationArr,
    })

    await location.save();
    await Category.findOneAndUpdate({
      _id: req.body.categoryId
    }, {
      $push: {
        locations: location._id
      }
    }, {
      new: true
    });

    res.status(200).json({
      error: false,
      message: "Location successfully created"
    })
  } catch (err) {
    next(err)
  }
}

const findAllLocation = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json({
      location,
      message: 'success'
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "some error occured while retriveing locations",
      location: null
    })
  }
}

const getLocation = async (req, res) => {
  try {
    const location = await Location
      .findOne({_id:req.params.id});
    res.status(200).json({
      location,
      message: 'success'
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "some error occured while retriveing category",
      location: null
    })
  }
}

const getLocationsOfCategory = async (req, res) => {
  console.log(req.body)
  try {
    const locations = await Category
      .findOne({_id: req.body.categoryId})
      .select('_id name')
      .populate('locations', 'name locality latitude longitude phone');
    res.status(200).json({
      locations,
      message: 'success'
    });
  } catch (err) {
    res.status(400).json({
      locations: null,
      message: 'error'
    });
  }
}

const updateLocation = async (req, res) => {
  console.log(req.body);
  if (!req.body.locality) {
    return res.status(400).send({
      message: "location content can not be empty",
      location: null
    });
  }

  let phoneArr = [req.body.phone1, req.body.phone2, req.body.phone3];
  const location = await Location.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    locality: req.body.locality,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    phone: phoneArr
  }, {
    new: true
  })

  if (!location) {
    return res.status(404).json({
      message: 'some error occured',
      location: null
    });
  }
  res.status(200).send({
    message: 'success',
    location
  });
};

const deleteLocation = async (req, res) => {
  console.log(req.params);
  await Location.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({
      message: "location has been deleted"
    }))
    .catch((err) =>{
      console.log(err);
      res.status(400).json({
        message: "error"
      });
    }
    )
}

module.exports = {
  createLocation,
  findAllLocation,
  getLocation,
  getLocationsOfCategory,
  updateLocation,
  deleteLocation
}
