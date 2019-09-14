const { Admin } = require('../../models/admin');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
require('dotenv').config();

const register = async (req, res) => {
  if(req.admin.role === 'admin') return res.status(200).json({message: "not authorzied to create user"});

  let admin = await Admin.findOne({email: req.body.email});
  if(admin) return res.status(200).json({message: 'user already registered.'});

  // if(req.body.password === req.body.password2) return res.status(200).json({message: ""})

  admin = new Admin({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password, 
     role: req.body.role
  });

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();

  const token = admin.generateAuthToken();
  res.header('x-auth-token', token).json({message:'success', admin});
}

const login = async (req, res) => {
  
  let admin = await Admin.findOne({email: req.body.email});
  if(!admin) return res.status(200).json({message: 'user not registered'});

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  // console.log(validPassword);
  if(!validPassword) return res.status(200).json({message: 'invalid email or password'});

  const token = admin.generateAuthToken();
  // console.log(token);
  res.status(200).json({token, message:'success'});
}

const forget = async (req, res) => {
  // 
  let admin_email = req.body.email;
  const admin = await Admin.findOne({email: admin_email});
  if(!admin) return res.status(200).json({message: 'user not registered'});
  // console.log(admin);
  
  const adEmail = req.body.email;
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  let link = "http://139.59.35.179/resetpassword/" + adEmail;
  // let link = "http://localhost:3000/#/resetpassword/" + adEmail;

  let message = "Please click the link below to reset your password.<br>" +
   "<a href=\"" + link + "\">Reset Password</a>";
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: '"Pragya | Royal Enfield" <aakash@techtonic.asia>', // sender address
      to: adEmail, // list of receivers
      subject: "[Pragya] Reset your Password", // Subject line
      text: message, // plain text body
      html: `<b>${message}</b>`  // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({message: 'email sent successfully'});
  } catch (ex) {
    // console.log(ex);
    res.status(400).json({message: 'some error occurred'});
  }
}

const passwordLinkSent = async (req, res) => {
  
  let admin = await Admin.findOne({email: req.body.email});
  if(!admin) return res.status(200).json({message: 'invalid admin', user: ''});
  // if(req.body.password !== req.body.password2) return res.status(200).json({message: 'please check your password'});

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // console.log(password);

    await Admin.findByIdAndUpdate(admin._id, {password: password}, {new: true});
    const token = admin.generateAuthToken();
    // console.log(admin);
    res.header('x-auth-token', token).json({user: admin, message: 'password changed'});
  }
  catch (err){
    res.status(400).json({message: 'error', user: ''});
  }
}

const changePassword = async (req, res) => {
  console.log(req.body, req.admin);

  try {
    let admin = await Admin.findOne({email: req.body.email});
    // console.log(admin)
    if(!admin) return res.status(200).json({message: 'invalid admin', user: ''});

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    // console.log(validPassword);
    if(!validPassword) return res.status(200).json({message: 'invalid email or password'});

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.newpassword, salt);

    await Admin.findByIdAndUpdate(admin._id, {password: password}, {new: true});
    const token = admin.generateAuthToken();
    // console.log(admin);
    res.header('x-auth-token', token).json({user: admin, message: 'password changed'});
  }
  catch (err){
    res.status(400).json({message: 'error', user: ''});
  }
}


module.exports = {
  register, login, forget, passwordLinkSent, changePassword
}
