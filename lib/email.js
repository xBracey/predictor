import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

export const sendMail = (mailOptions, callback = () => {}) => {
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      callback();
    }
  });
};
