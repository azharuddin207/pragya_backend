// require('dotenv').config();
// const nodemailer = require("nodemailer");
//
//
// module.exports = function (req, res, next) {
//   console.log(req.body);
//   const adEmail = req.body.email;
//   let transporter = nodemailer.createTransport({
//     host: "smtp.zoho.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD
//     }
//   });
//   let link = "http://localhost:3000/api/admin/auth/password/" + adEmail;
//   let message = "Please click the link below to reset your password.<br>" + "<a href=\"" + link + "\">Reset Password</a>";
//   // send mail with defined transport object
//   try {
//     let info = transporter.sendMail({
//       from: '"Pragya Techtonic" <aakash@techtonic.asia>', // sender address
//       to: "" + adEmail, // list of receivers
//       subject: "[Pragya] Reset your Password", // Subject line
//       text: "" + message, // plain text body
//       html: `<b>${message}</b>`  // html body
//     });
//
//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     next();
//   } catch (ex) {
//     res.status(400).json({message: 'some error occurred'});
//   }
// }
